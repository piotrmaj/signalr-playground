using Microsoft.AspNetCore.Mvc;
using WebSocketsApi.WebSockets;

namespace WebSocketsApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PointsController : ControllerBase
    {
        private readonly MainHub mainHub;

        public PointsController(
           MainHub mainHub)
        {
            this.mainHub = mainHub;
        }

        [HttpPost]
        public async Task<IActionResult> PostPoints(PostPointsRequest request)
        {
            await this.mainHub.SendData(request.Points);

            return Ok();
        }
    }

    public class PostPointsRequest
    {
        public List<Point> Points { get; set; }
    }

    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
