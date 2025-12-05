import { api } from '@/src/core/api';

export type ChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordDTO = {
  email: string;
  newPassword: string;
  confirmPassword: string;
  resetToken?: string;
};

export type PasswordResponse = {
  message: string;
  success: boolean;
};

export const passwordService = {
  async changePassword(payload: ChangePasswordDTO): Promise<PasswordResponse> {
    console.log('🔑 Iniciando troca de senha...');

    if (payload.newPassword !== payload.confirmPassword) {
      throw new Error('As senhas não conferem');
    }

    const { data } = await api.post<PasswordResponse>('/auth/change-password', {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    });

    console.log('✅ Senha alterada com sucesso');
    return data;
  },

  async resetPassword(payload: ResetPasswordDTO): Promise<PasswordResponse> {

    if (payload.newPassword !== payload.confirmPassword) {
      throw new Error('As senhas não conferem');
    }

    const { data } = await api.post<PasswordResponse>('/auth/reset-password', {
      email: payload.email,
      newPassword: payload.newPassword,
      resetToken: payload.resetToken,
    });

    return data;
  },


  async requestPasswordReset(email: string): Promise<PasswordResponse> {

    const { data } = await api.post<PasswordResponse>('/auth/request-reset', {
      email,
    });

    return data;
  },
};
