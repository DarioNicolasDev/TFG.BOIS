

using Microsoft.AspNetCore.SignalR;
using TFG.RecetasAPI.Autenticacion;

namespace TFG.RecetasAPI.Hubs
{
    [CustomAuthorize]
    public class NotificacionHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("RecibirMensaje", user, message);
        }
    }
}
