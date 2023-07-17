using System.Text.Json.Nodes;

namespace Thor.Models.Database;

public class Settings : IEntity<int>
{
    public int Id { get; set; }
    public string Key { get; set; }
    public JsonObject Value { get; set; }
}