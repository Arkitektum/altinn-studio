FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR Register/

COPY Register ./Register
WORKDIR Register/

RUN dotnet build Altinn.Platform.Register.csproj -c Release -o /app_output
RUN dotnet publish Altinn.Platform.Register.csproj -c Release -o /app_output

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS final
EXPOSE 5020
WORKDIR /app
COPY --from=build /app_output .
# setup the user and group
# the user will have no password, using shell /bin/false and using the group dotnet
RUN addgroup -g 3000 dotnet && adduser -u 1000 -G dotnet -D -s /bin/false dotnet
# update permissions of files if neccessary before becoming dotnet user
USER dotnet
RUN mkdir /tmp/logtelemetry

ENTRYPOINT ["dotnet", "Altinn.Platform.Register.dll"]
