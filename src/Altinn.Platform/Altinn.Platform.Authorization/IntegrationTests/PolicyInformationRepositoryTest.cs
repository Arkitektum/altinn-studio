using Altinn.Platform.Authorization.Configuration;
using Altinn.Platform.Authorization.IntegrationTests.Fixtures;
using Altinn.Platform.Authorization.Repositories;
using Altinn.Platform.Storage.Models;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Altinn.Platform.Authorization.IntegrationTests
{
    public class PolicyInformationRepositoryTest : IClassFixture<PlatformAuthorizationFixture>
    {
        Mock<IOptions<AzureCosmosSettings>> _dbConfigMock;
        private readonly PlatformAuthorizationFixture _fixture;
        private static DocumentClient _client;
        private readonly PolicyInformationRepository _pir;
        private const string INSTANCE_ID = "50005297/697064e4-4961-428c-ac33-67c4fa99754b";
        private const int INSTANCE_OWNER_ID = 50005297;

        public PolicyInformationRepositoryTest(PlatformAuthorizationFixture fixture)
        {
            _fixture = fixture;
            _dbConfigMock = new Mock<IOptions<AzureCosmosSettings>>();
            _dbConfigMock.Setup(s => s.Value).Returns(new AzureCosmosSettings()
            {
                EndpointUri = "https://localhost:8081",
                PrimaryKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
                Database = "ServiceEngine",
                InstanceCollection = "Instance",
                ApplicationCollection = "applications"
            });

            ConnectionPolicy connectionPolicy = new ConnectionPolicy
            {
                ConnectionMode = ConnectionMode.Gateway,
                ConnectionProtocol = Protocol.Https,
            };

            _client = new DocumentClient(new Uri("https://localhost:8081"),
                "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
                connectionPolicy);
            _client.OpenAsync();

            _pir = new PolicyInformationRepository(_dbConfigMock.Object, new Mock<ILogger<PolicyInformationRepository>>().Object);
        }

        /// <summary>
        /// Test case: Get from cosmos a exsisting instance 
        /// Expected: GetInstance returns instance that is not null
        /// </summary>
        [Fact]
        public async Task GetPolicy_TC01()
        {
            // Arrange & Act
            Instance instance = await _pir.GetInstance(INSTANCE_ID, INSTANCE_OWNER_ID);

            // Assert
            Assert.NotNull(instance);
        }

        /// <summary>
        /// Test case: Get from cosmos a instance that do not exist 
        /// Expected: GetInstance returns null
        /// </summary>
        [Fact]
        public async Task GetPolicy_TC02()
        {
            // Arrange & Act
            Instance instance = await _pir.GetInstance(INSTANCE_ID, INSTANCE_OWNER_ID + 1);

            // Assert
            Assert.Null(instance);
        }

        /// <summary>
        /// Test case: Get instance from cosmos where instanceId is null
        /// Expected: GetInstance throws ArgumentException
        /// </summary>
        [Fact]
        public async Task GetPolicy_TC03()
        {
            // Arrange & Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _pir.GetInstance(null, INSTANCE_OWNER_ID));
        }

        /// <summary>
        /// Test case: Get instance from cosmos where instanceOwnerId is negative or zero
        /// Expected: GetInstance throws ArgumentException
        /// </summary>
        [Fact]
        public async Task GetPolicy_TC04()
        {
            // Arrange & Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _pir.GetInstance(INSTANCE_ID, -1));
        }

        /// <summary>
        /// Test case: Get from cosmos a exsisting instance 
        /// Expected: GetInstance returns instance with same instanceId and instanceOwnerId as sent in
        /// </summary>
        [Fact]
        public async Task GetPolicy_TC05()
        {
            // Arrange & Act
            Instance instance = await _pir.GetInstance(INSTANCE_ID, INSTANCE_OWNER_ID);

            // Assert
            Assert.Equal(INSTANCE_ID, instance.Id);
            Assert.Equal(INSTANCE_OWNER_ID.ToString(), instance.InstanceOwnerId);
        }
    }
}
