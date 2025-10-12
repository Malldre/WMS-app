import { GluestackUIProvider as Provider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

type Props = { children: React.ReactNode };

export function GluestackUIProvider({ children }: Props) {
  return <Provider config={config}>{children}</Provider>;
}
