﻿using System.Text.Json.Serialization;

namespace Thor.Models.OAuth;

public class TokenRequest
{
    [JsonPropertyName("audience")]
    public string Audience { get; set; }

    [JsonPropertyName("client_id")]
    public string ClientId { get; set; }

    [JsonPropertyName("client_secret")]
    public string ClientSecret { get; set; }

    [JsonPropertyName("grant_type")]
    public string GrantType { get; set; }
}
