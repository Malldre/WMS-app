import { Image } from 'react-native';
import { Box } from '@gluestack-ui/themed';


export default function HeaderUniqueIcon() {
  return (
  <>
    <Box bg="#0F0F1A" h={180} alignItems="center" justifyContent="center">
      <Image
        source={require('@/assets/malldre-icon.png')}
        style={{ width: 160, height: 80, resizeMode: 'contain' }}
      />
    </Box>
    <Box
      bgColor='$coolGray500'
      mt='-$3.5'
      h={20}
      borderTopLeftRadius={16}
      borderTopRightRadius={16}>
    </Box>
  </>
  )
}
