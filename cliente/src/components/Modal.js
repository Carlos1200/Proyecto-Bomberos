import React from "react";
import { motion } from "framer-motion";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop } from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
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

export const Modal = ({ handleClose,children}) => {
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
        >
            {children}
        </motion.div>
      </ModalContainer>
    </Backdrop>
  );
};

const ModalContainer=styled.div`
    width: clamp(90%,768px,90%);
    max-height: 90%;

    margin: auto;
    padding: 2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    background-color: white;
`;
