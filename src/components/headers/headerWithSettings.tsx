import { Image, Pressable } from 'react-native';
import { Box, HStack, Icon } from '@gluestack-ui/themed';
import { Menu } from 'lucide-react-native';


export default function HeaderWithSettings() {
  return (
  <>
    <HStack p='$8' bg="#0F0F1A" h={140}  alignItems="center" justifyContent="space-between">
      <Pressable>
        <Icon
          as={Menu}
          size='xl'
          color='$white'>
        </Icon>
      </Pressable>
      <Image
        source={require('@/assets/malldre-icon.png')}
        style={{ width: 120, height: 120, resizeMode: 'contain' }}
      />
    </HStack>
    <Box
      bgColor='$coolGray500'
      mt='-$10'
      h={40}
      borderTopLeftRadius={56}
      borderTopRightRadius={56}>
    </Box>
  </>
  )
}
