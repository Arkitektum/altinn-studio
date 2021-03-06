FROM node:10.13.0 AS generate-designer-js
COPY /src/AltinnCore/Designer/package.json .
COPY /src/AltinnCore/Designer/package-lock.json .
RUN npm ci
COPY /src/AltinnCore/Designer .
RUN npm run gulp build

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
COPY /src/AltinnCore ./AltinnCore/
COPY --from=generate-designer-js /wwwroot /AltinnCore/Designer/wwwroot

RUN dotnet build AltinnCore/Designer/AltinnCore.Designer.csproj -c Release -o /app_output
RUN dotnet publish AltinnCore/Designer/AltinnCore.Designer.csproj -c Release -o /app_output

# Altinn-Studio Service-Development
FROM altinn-studio-service-development:latest AS altinn-studio-service-development

# Altinn-Studio Dashboard
FROM altinn-studio-dashboard:latest AS altinn-studio-dashboard

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS final
EXPOSE 80
WORKDIR /app
COPY --from=build /app_output .
COPY --from=altinn-studio-service-development /dist/service-development.js ./wwwroot/designer/js/react/service-development.js
COPY --from=altinn-studio-service-development /dist/0.service-development.js ./wwwroot/designer/js/react/0.service-development.js
COPY --from=altinn-studio-service-development /dist/1.service-development.js ./wwwroot/designer/js/react/1.service-development.js
COPY --from=altinn-studio-service-development /dist/2.service-development.js ./wwwroot/designer/js/react/2.service-development.js
COPY --from=altinn-studio-service-development /dist/3.service-development.js ./wwwroot/designer/js/react/3.service-development.js
COPY --from=altinn-studio-service-development /dist/editor.worker.js ./wwwroot/designer/js/react/editor.worker.js
COPY --from=altinn-studio-service-development /dist/typescript.worker.js ./wwwroot/designer/js/react/typescript.worker.js
COPY --from=altinn-studio-service-development /dist/service-development.css ./wwwroot/designer/css/react/service-development.css
COPY --from=altinn-studio-dashboard /dist/dashboard.js ./wwwroot/designer/js/react/dashboard.js
COPY --from=altinn-studio-dashboard /dist/dashboard.css ./wwwroot/designer/css/dashboard.css

## Copying app template
COPY /src/Altinn.Apps/AppTemplates/AspNet/App ./Templates/AspNet/App
COPY /src/Altinn.Apps/AppTemplates/AspNet/App.IntegrationTests ./Templates/AspNet/App.IntegrationTests
COPY /src/Altinn.Apps/AppTemplates/AspNet/deployment ./Templates/AspNet/deployment
COPY /src/Altinn.Apps/AppTemplates/AspNet/.gitignore ./Templates/AspNet
COPY /src/Altinn.Apps/AppTemplates/AspNet/App.sln ./Templates/AspNet

#RUN mv Templates ..
RUN mv Testdata ..

ENTRYPOINT ["dotnet", "AltinnCore.Designer.dll"]
