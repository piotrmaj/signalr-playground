using Microsoft.AspNetCore.SignalR;

namespace WebSocketsApi.WebSockets
{
    public class MainHub : Hub
    {
        private readonly IHubContext<MainHub> context;

        public MainHub(IHubContext<MainHub> context)
        {
            this.context = context;
        }

        public async Task SendMessage(string user, string message)
        {
            await context.Clients.All.SendAsync("messageReceived", user, message);
        }
    }
}
