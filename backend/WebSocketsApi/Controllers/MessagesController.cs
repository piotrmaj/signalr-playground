using Microsoft.AspNetCore.Mvc;
using WebSocketsApi.WebSockets;

namespace WebSocketsApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly MainHub mainHub;

        public MessagesController(
            ILogger<WeatherForecastController> logger,
            MainHub mainHub)
        {
            _logger = logger;
            this.mainHub = mainHub;
        }

        [HttpPost]
        public async Task<IActionResult> PostMessage()
        {
            await this.mainHub.SendMessage("TestUser", "TestContent");

            return Ok();
        }
    }
}
