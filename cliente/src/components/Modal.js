import React from "react";
import { motion } from "framer-motion";
import styled from 'styled-components';
import { Backdrop } from "./Backdrop";

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const Modal = ({ handleClose,children,grande}) => {

  ModalContainer.defaultProps={
    grande:grande?"clamp(90%,768px,90%)":"clamp(50%,768px,90%)"
  }

  return (
    <Backdrop onClick={handleClose}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
            style={{width:'100%',height:'100%'}}
        >
            {children}
        </motion.div>
      </ModalContainer>
    </Backdrop>
  );
};

const ModalContainer=styled.div`
    width: ${props=>props.grande};
    max-height: 90%;

    margin: auto;
    padding: 2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    /* overflow-y: auto;

    &::-webkit-scrollbar {
    display: none;
    } */
`;
