import { Flex, Image } from '@chakra-ui/react';
import Image2 from "../assets/images/Netflix-Logo-removebg-preview.png";
import { useEffect, useState } from 'react';

const Nav = () => {
    const [show, handleShow] = useState(false);
     useEffect(() => {
       const handleScroll = () => {
         if (window.scrollY > 100) {
           handleShow(true);
         } else {
           handleShow(false);
         }
       };

       window.addEventListener("scroll", handleScroll);

       return () => {
         window.removeEventListener("scroll", handleScroll);
       };
     }, []);
  return (
    <Flex
      position={"fixed"}
      top={0}
      width={"100%"}
      justifyContent={"space-between"}
      zIndex={1}
      bgColor={show ? "#000" : "transparent"}
      h={"50px"}
      px={"20px"}
      pt={"8px"}
      transitionTimingFunction={"ease-in"}
      transition={"all 0.5s"}
    >
      <Image
        src={Image2}
        alt="Netflix Logo"
        pos={"fixed"}
        left={"20px"}
        width={"120px"}
        objectFit={"contain"}
      />
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Profile Logo"
        pos={"fixed"}
        right={"25px"}
        w={"30px"}
        objectFit={"contain"}
      />
    </Flex>
  );
}

export default Nav;
