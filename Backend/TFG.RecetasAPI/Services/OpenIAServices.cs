using Azure.Core;
using Data;
using Microsoft.EntityFrameworkCore;
using Models.ApiModels;
using Models.Ingrediente;
using Models.OpenAI;
using Models.Preferencia;
using Models.Receta;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Services
{
    public class OpenIAServices
    {
        private readonly HttpClient _httpClient;
        private readonly AppDBContext _context;
        public OpenIAServices(HttpClient httpClient, AppDBContext context)
        {
            _httpClient = httpClient;
            _context = context;
        }

        public async Task<ApiResponse<Receta>> InventReceta(List<Ingrediente> ingredientes, List<Preferencia> preferencias = null)
        {
            ApiResponse<Receta> response = new ApiResponse<Receta>();
            InvocacionIA invocacion = new InvocacionIA();
            invocacion.FechaHoraPeticion = DateTime.Now;
            try
            {               
                var payload = JsonConvert.SerializeObject(await CrearPayloadAsync(ingredientes, preferencias));              
                var stringContent = new StringContent(payload, null, "application/json");
                invocacion.PeticionIA = payload;
                invocacion = await CrearInvocacionIA(invocacion);
                HttpResponseMessage apiResponse = await _httpClient.PostAsync($"/v1/chat/completions", stringContent);


                invocacion.RespuestaIA = await apiResponse.Content.ReadAsStringAsync();
                invocacion.FechaHoraRespuesta = DateTime.Now;
                await ActualizarInvocacionIA(invocacion);

                if (apiResponse.IsSuccessStatusCode)
                {

                    var apiResponseContent = await apiResponse.Content.ReadAsStringAsync();


                    //byte[] utf8String = Encoding.UTF8.GetBytes(apiResponseContent);


                    //var objJson = JObject.Parse(respuesta.Result);
                    // var objResult = objJson["result"].ToString();
                    OpenAIResponse resp = JsonConvert.DeserializeObject<OpenAIResponse>(apiResponseContent);
                    Receta receta = new Receta();

                    var objJson = JObject.Parse(resp.choices.FirstOrDefault().message.content);
                    var objResult = objJson["receta"].ToString();


                    receta = JsonConvert.DeserializeObject<Receta>(objResult);

                    if (receta != null)
                    {
                        response.Data.Add(receta);
                        response.StatusCode = 200;
                        response.Detail = "Receta generada por IA";
                    }
                    else
                    {
                        throw new Exception();
                    }

                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.StatusCode = 200;
                response.Detail = "No se pudo generar una receta con IA";
            }
            
            return response;
        }

        private async Task<OpenAIRequest> CrearPayloadAsync(List<Ingrediente> ingredientes, List<Preferencia> preferencias = null)
        {
            OpenAIRequest openAIRequest = new OpenAIRequest();
            OpenAIRequestMessage openAIMessage = new OpenAIRequestMessage();
            List<ParametroOpenAI> parametros = await ObtenerParametrosOpenAI();
            string content = parametros.FirstOrDefault(x => x.Campo == "content").Valor;

            string ingredientesStr = "";
            string preferenciasStr = "";
            foreach (Ingrediente ingrediente in ingredientes)
            {
                ingredientesStr = ingredientesStr + ingrediente.NombreIngrediente + ", ";
            }
            if (preferencias != null && preferencias.Count > 0)
            {
                preferenciasStr = parametros.FirstOrDefault(x => x.Campo == "content-preferencias").Valor;
              
                foreach (Preferencia preferencia in preferencias)
                {
                    if(preferencia != null)
                    {
                        preferenciasStr = preferenciasStr + preferencia.NombrePreferencia + ", ";
                    }
                    else
                    {
                        preferenciasStr = "";
                        break;
                    }
                    
                }
            }

            content = content.Replace("%%ingredientesStr%%", ingredientesStr);
            content = content.Replace("%%preferenciasStr%%", preferenciasStr);

            openAIMessage.role = parametros.FirstOrDefault(x => x.Campo == "role").Valor;
            openAIMessage.content = content;
            openAIRequest.messages.Add(openAIMessage);
            openAIRequest.model = parametros.FirstOrDefault(x => x.Campo == "model").Valor;

            return openAIRequest;
        }


        private async Task<InvocacionIA> CrearInvocacionIA(InvocacionIA invocacion) {
            await _context.InvocacionIA.AddAsync(invocacion);
            await _context.SaveChangesAsync();
            return invocacion;
        }

        private async Task ActualizarInvocacionIA(InvocacionIA invocacion)
        {
            _context.InvocacionIA.Update(invocacion);
            await _context.SaveChangesAsync();
        }

        private async Task<List<ParametroOpenAI>> ObtenerParametrosOpenAI()
        {
            List<ParametroOpenAI> parametros = new List<ParametroOpenAI>();
            parametros = await _context.ParametroOpenAI.ToListAsync();
            return parametros;
        }
    }
}
