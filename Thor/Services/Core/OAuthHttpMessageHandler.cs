using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Thor.Services.Api;

namespace Thor.Services.Core;

public class OAuthHttpMessageHandler : DelegatingHandler
{
    private readonly IOAuthTokenProvider _tokenProvider;

    public OAuthHttpMessageHandler(IOAuthTokenProvider tokenProvider)
    {
        _tokenProvider = tokenProvider;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var token = await _tokenProvider.GetAuthToken();

        request.Headers.Authorization = new AuthenticationHeaderValue(token.TokenType, token.AccessToken);

        return await base.SendAsync(request, cancellationToken);
    }
}
