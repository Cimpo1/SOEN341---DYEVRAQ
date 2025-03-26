import React, { useState, useEffect } from "react";
import axios from "axios";
{/*I'm putting a disclaimer every time:
idk if we need those but just in case i dont wanna break smth
its easy to delete later anyway*/}

const stylesHomeContent = {
    container: {
      display: "flex",
      height: "calc(100vh - 21vh)",
      backgroundColor: "#1a1a1a",
      width: "100%",
    },
    chatArea: {
      flex: 1,
      display: "flex",
      width: "calc(100% - 80px)",
    },
  };

export { stylesHomeContent };