FROM mcr.microsoft.com/dotnet/sdk:latest AS build
WORKDIR /src

COPY ./Thor ./Thor
COPY ./Thor.DatabaseProvider ./Thor.DatabaseProvider
COPY ./Thor.Models ./Thor.Models

WORKDIR /src/Thor
RUN dotnet restore
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:latest
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "thor.dll"]