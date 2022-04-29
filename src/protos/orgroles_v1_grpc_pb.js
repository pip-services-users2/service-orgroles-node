// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var orgroles_v1_pb = require('./orgroles_v1_pb.js');

function serialize_orgroles_v1_DemoOrganizationRequest(arg) {
  if (!(arg instanceof orgroles_v1_pb.DemoOrganizationRequest)) {
    throw new Error('Expected argument of type orgroles_v1.DemoOrganizationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_DemoOrganizationRequest(buffer_arg) {
  return orgroles_v1_pb.DemoOrganizationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_OrgIdReply(arg) {
  if (!(arg instanceof orgroles_v1_pb.OrgIdReply)) {
    throw new Error('Expected argument of type orgroles_v1.OrgIdReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_OrgIdReply(buffer_arg) {
  return orgroles_v1_pb.OrgIdReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_OrgIdRequest(arg) {
  if (!(arg instanceof orgroles_v1_pb.OrgIdRequest)) {
    throw new Error('Expected argument of type orgroles_v1.OrgIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_OrgIdRequest(buffer_arg) {
  return orgroles_v1_pb.OrgIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_RolesListReply(arg) {
  if (!(arg instanceof orgroles_v1_pb.RolesListReply)) {
    throw new Error('Expected argument of type orgroles_v1.RolesListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_RolesListReply(buffer_arg) {
  return orgroles_v1_pb.RolesListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_RolesListRequest(arg) {
  if (!(arg instanceof orgroles_v1_pb.RolesListRequest)) {
    throw new Error('Expected argument of type orgroles_v1.RolesListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_RolesListRequest(buffer_arg) {
  return orgroles_v1_pb.RolesListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_RolesReply(arg) {
  if (!(arg instanceof orgroles_v1_pb.RolesReply)) {
    throw new Error('Expected argument of type orgroles_v1.RolesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_RolesReply(buffer_arg) {
  return orgroles_v1_pb.RolesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_UserIdsReply(arg) {
  if (!(arg instanceof orgroles_v1_pb.UserIdsReply)) {
    throw new Error('Expected argument of type orgroles_v1.UserIdsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_UserIdsReply(buffer_arg) {
  return orgroles_v1_pb.UserIdsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orgroles_v1_UserRoleRequest(arg) {
  if (!(arg instanceof orgroles_v1_pb.UserRoleRequest)) {
    throw new Error('Expected argument of type orgroles_v1.UserRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orgroles_v1_UserRoleRequest(buffer_arg) {
  return orgroles_v1_pb.UserRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The roles service definition.
var OrgRolesService = exports.OrgRolesService = {
  get_organization_admins: {
    path: '/orgroles_v1.OrgRoles/get_organization_admins',
    requestStream: false,
    responseStream: false,
    requestType: orgroles_v1_pb.OrgIdRequest,
    responseType: orgroles_v1_pb.UserIdsReply,
    requestSerialize: serialize_orgroles_v1_OrgIdRequest,
    requestDeserialize: deserialize_orgroles_v1_OrgIdRequest,
    responseSerialize: serialize_orgroles_v1_UserIdsReply,
    responseDeserialize: deserialize_orgroles_v1_UserIdsReply,
  },
  get_organization_users: {
    path: '/orgroles_v1.OrgRoles/get_organization_users',
    requestStream: false,
    responseStream: false,
    requestType: orgroles_v1_pb.OrgIdRequest,
    responseType: orgroles_v1_pb.UserIdsReply,
    requestSerialize: serialize_orgroles_v1_OrgIdRequest,
    requestDeserialize: deserialize_orgroles_v1_OrgIdRequest,
    responseSerialize: serialize_orgroles_v1_UserIdsReply,
    responseDeserialize: deserialize_orgroles_v1_UserIdsReply,
  },
  get_organization_user_roles: {
    path: '/orgroles_v1.OrgRoles/get_organization_user_roles',
    requestStream: false,
    responseStream: false,
    requestType: orgroles_v1_pb.RolesListRequest,
    responseType: orgroles_v1_pb.RolesListReply,
    requestSerialize: serialize_orgroles_v1_RolesListRequest,
    requestDeserialize: deserialize_orgroles_v1_RolesListRequest,
    responseSerialize: serialize_orgroles_v1_RolesListReply,
    responseDeserialize: deserialize_orgroles_v1_RolesListReply,
  },
  grant_org_role: {
    path: '/orgroles_v1.OrgRoles/grant_org_role',
    requestStream: false,
    responseStream: false,
    requestType: orgroles_v1_pb.UserRoleRequest,
    responseType: orgroles_v1_pb.RolesReply,
    requestSerialize: serialize_orgroles_v1_UserRoleRequest,
    requestDeserialize: deserialize_orgroles_v1_UserRoleRequest,
    responseSerialize: serialize_orgroles_v1_RolesReply,
    responseDeserialize: deserialize_orgroles_v1_RolesReply,
  },
  revoke_org_role: {
    path: '/orgroles_v1.OrgRoles/revoke_org_role',
    requestStream: false,
    responseStream: false,
    requestType: orgroles_v1_pb.UserRoleRequest,
    responseType: orgroles_v1_pb.RolesReply,
    requestSerialize: serialize_orgroles_v1_UserRoleRequest,
    requestDeserialize: deserialize_orgroles_v1_UserRoleRequest,
    responseSerialize: serialize_orgroles_v1_RolesReply,
    responseDeserialize: deserialize_orgroles_v1_RolesReply,
  },
  grant_demo_organization_user_role: {
    path: '/orgroles_v1.OrgRoles/grant_demo_organization_user_role',
    requestStream: false,
    responseStream: false,
    requestType: orgroles_v1_pb.DemoOrganizationRequest,
    responseType: orgroles_v1_pb.OrgIdReply,
    requestSerialize: serialize_orgroles_v1_DemoOrganizationRequest,
    requestDeserialize: deserialize_orgroles_v1_DemoOrganizationRequest,
    responseSerialize: serialize_orgroles_v1_OrgIdReply,
    responseDeserialize: deserialize_orgroles_v1_OrgIdReply,
  },
};

exports.OrgRolesClient = grpc.makeGenericClientConstructor(OrgRolesService);
