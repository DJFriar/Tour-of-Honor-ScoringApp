import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

function SubmitButton({ color, disabled, title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton color={color} title={title} onPress={handleSubmit} disabled={disabled}/>
  );
}

export default SubmitButton;