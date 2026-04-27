// Devopstrio Audit Trail Immutability
// Immutability Core Infrastructure

targetScope = 'subscription'

param location string = 'uksouth'
param prefix string = 'ati-core'
param env string = 'prd'

resource rgPlatform 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-platform-${env}'
  location: location
}

// 1. Storage Account Configuration explicitly targeting WORM Immutability Policies
module wormStorage './modules/storage.bicep' = {
  scope: rgPlatform
  name: 'wormStorageDeploy'
  params: {
    location: location
    accountName: 'st${prefix}worm${env}'
    enableLegalHold: true  
    immutabilityPeriodDays: 2555 // 7 Years Legal Archive Retention
  }
}

// 2. High-Throughput Search Metadata Indexer (PostgreSQL)
module psql './modules/postgres.bicep' = {
  scope: rgPlatform
  name: 'postgresDeploy'
  params: {
    location: location
    serverName: 'psql-${prefix}-meta-${env}'
  }
}

// 3. Central Web Application Hosting for Gateway, Workers, and Forensics Portal
module platform './modules/aks.bicep' = {
  scope: rgPlatform
  name: 'k8sDeploy'
  params: {
    location: location
    clusterName: 'aks-${prefix}-host-${env}'
  }
}

output platformUrl string = platform.outputs.portalFqdn
output immutableStorageContainerURI string = wormStorage.outputs.blobEndpoint
