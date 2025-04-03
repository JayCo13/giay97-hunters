import React from 'react';
import '../styles/StartDialog.css';
import { FiAlertTriangle } from 'react-icons/fi';
import { GiCrosshair } from 'react-icons/gi';

const StartDialog = ({ onStartGame }) => {
  return (
    <div className="start-dialog">
      <div className="dialog-content">
        <h1>Giây97 - Hunters<GiCrosshair className="start-icon"/></h1>
       <i><p>Gêm chỉ dành cho đóm!</p></i>
        <p> <FiAlertTriangle className="start-icon2"/> GAME CHỈ MANG TÍNH CHẤT GIẢI TRÍ, KHÔNG CÓ MỤC ĐÍCH CÔNG KÍCH HAY XÚC PHẠM MỘT CÁ NHÂN HAY TỔ CHỨC NÀO!</p>
        <button 
          className="start-button"
          onClick={onStartGame}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default StartDialog;