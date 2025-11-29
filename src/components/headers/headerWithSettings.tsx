import { Image, Pressable } from 'react-native';
import { Box, HStack, Icon } from '@gluestack-ui/themed';
import { Menu } from 'lucide-react-native';
import { useRef, useState } from 'react';
import HeaderMenu from '../headerMenu';
import { useSession } from '@/src/auth/useSession';


export default function HeaderWithSettings() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSession();

  return (
  <>
    <HStack p='$8' bg="#0F0F1A" h={140}  alignItems="center" justifyContent="space-between">
      <Box>
        <Pressable onPress={() => setOpenMenu(!openMenu)}>
          <Icon
            as={Menu}
            size='xl'
            color='$white'>
          </Icon>
        </Pressable>
        <HeaderMenu
          isOpen={openMenu}
          onOpenChange={setOpenMenu}
          employeeName={user?.name}
        />
      </Box>
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
