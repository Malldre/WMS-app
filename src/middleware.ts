import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export function middleware(req: ExpoRequest) {
  const url = new URL(req.url);
  // grupos: /(auth) é aberto; /(private) exige sessão
  if (url.pathname.startsWith('/(private)')) {
    // o router server não lê SecureStore; use cookie se tiver backend web.
    // Como alternativa simples: checagem será feita client-side no _layout privado.
  }
  return ExpoResponse.next();
}
