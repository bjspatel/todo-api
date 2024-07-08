import { AUTH_CONSTANTS } from 'src/auth/auth.constants';

import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(AUTH_CONSTANTS.IS_PUBLIC_KEY, true);
