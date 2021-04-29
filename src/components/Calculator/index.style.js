import styled from "styled-components";
import { Card as AntCard, InputNumber, Button as AntButton } from "antd";

export const Card = styled(AntCard)`
  margin-top: 50px;
  width: 740px;
  height: 406px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 2px 6px 10px #00000029;
  border: 0.5px solid #a4a4a4;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
`;

export const Input = styled(InputNumber)`
  width: 227px;
  height: 36px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #a4a4a4;
  border-radius: 2px;
  opacity: 1;
`;

export const Button = styled(AntButton)`
  width: 227px;
  height: 36px;
  background: #c10708 0% 0% no-repeat padding-box;
  border-radius: 2px;
  opacity: 1;
`;

export const ResultBox = styled.div`
  width: 227px;
  height: 36px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c10708;
  border-radius: 2px;
  opacity: 1;
  text-align: left;
  font: normal normal normal 16px/16px Varela Round;
  letter-spacing: 0px;
  color: #a4a4a4;
  margin: 0px auto;
  padding: 10px;
`;

export const Label = styled.p`
  height: 20px;
  text-align: center;
  font: normal normal normal 16px/16px Varela Round;
  letter-spacing: 0px;
  color: #a4a4a4;
  opacity: 1;
`;

export const LineBreak = styled.hr`
  border-top: 1px solid #c10708;
  width: 650px;
`;
