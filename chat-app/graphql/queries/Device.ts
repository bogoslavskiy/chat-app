import { gql } from '@apollo/client';

export const RegisterDeviceMutation = gql`
  mutation RegisterDevice($input: DeviceRegisterInput!) { 
    device {
      register(input: $input)
    }
  }
`;

export const UnregisterDeviceMutation = gql`
  mutation UnregisterDevice($token: NEString!) { 
    device {
      unregister(token: $token)
    }
  }
`;