using Microsoft.AspNetCore.SignalR;

namespace WebSocketsApi.WebSockets
{
    public class MainHub : Hub
    {
        private readonly IHubContext<MainHub> context;
        private readonly Random rand = new Random();

        public MainHub(IHubContext<MainHub> context)
        {
            this.context = context;
        }

        public async Task SendMessage(string user, string message)
        {
            var width = rand.Next(100, 500);
            var height = rand.Next(100, 500);
            var payload = new Rectangle
            {
                X = 10,
                Y = 10,
                Width = width,
                Height = height
            };
            await context.Clients.All.SendAsync("messageReceived", payload);
        }

        public async Task SendData(object payload)
        {
            await context.Clients.All.SendAsync("messageReceived", payload);
        }
    }

    public class Rectangle
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
