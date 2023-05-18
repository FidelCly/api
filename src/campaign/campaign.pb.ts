/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "campaign";

export interface SendRequest {
  senderEmail: string;
  recipients: string;
  subject: string;
  textData?: string | undefined;
  htmlData?: string | undefined;
  templateUrl?: string | undefined;
}

export interface SendResponse {
  status: number;
  errors: string[];
}

export const CAMPAIGN_PACKAGE_NAME = "campaign";

export interface CampaignServiceClient {
  send(request: SendRequest): Observable<SendResponse>;
}

export interface CampaignServiceController {
  send(request: SendRequest): Promise<SendResponse> | Observable<SendResponse> | SendResponse;
}

export function CampaignServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CampaignService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CampaignService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CAMPAIGN_SERVICE_NAME = "CampaignService";
