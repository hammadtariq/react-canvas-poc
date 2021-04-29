import { FC } from "react";
import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";
import SumService from "../../services/sum.service";

import * as S from "./index.style";
import { MutationType } from "./index.type";

const Calculator: FC = () => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(SumService.calculateSum, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("sum");
    },
  });
  const { isLoading, isError, data, error }: MutationType = mutation;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    mutation.mutate(values);
  };

  return (
    <S.Card>
      <S.Label>Enter the numbers</S.Label>
      <Form name="simple-calculator" onFinish={onFinish}>
        <Form.Item name="num1" rules={[{ required: true, message: "Please input first number!" }]}>
          <S.Input min={1} placeholder="number 1" />
        </Form.Item>
        <Form.Item name="num2" rules={[{ required: true, message: "Please input second number!" }]}>
          <S.Input min={1} placeholder="number 1" />
        </Form.Item>

        <Form.Item>
          <S.Button type="primary" htmlType="submit">
            Sum
          </S.Button>
        </Form.Item>
      </Form>
      <S.LineBreak />
      <S.Label>Results</S.Label>
      <S.ResultBox>{data ? data?.sum : null}</S.ResultBox>
    </S.Card>
  );
};

export default Calculator;
