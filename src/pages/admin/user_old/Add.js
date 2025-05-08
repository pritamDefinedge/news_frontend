import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import FormActions from './components/FormActions';


const AddUserForm = ({ onSubmit, onCancel }) => {
  const { handleSubmit, control, formState: { isSubmitting } } = useForm();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormInput name="firstName" control={control} label="First Name" required />
      <FormInput name="lastName" control={control} label="Last Name" required />
      <FormInput name="email" control={control} label="Email" type="email" required />
      <FormInput name="phone" control={control} label="Phone" type="tel" required />
      <FormInput name="password" control={control} label="Password" type="password" required />
      <FormSelect
        name="role"
        control={control}
        label="Role"
        options={[
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ]}
        required
      />
      <FormSelect
        name="isVerified"
        control={control}
        label="Verified Status"
        options={[
          { value: true, label: "Verified" },
          { value: false, label: "Not Verified" },
        ]}
        required
      />
      <FormSelect
        name="isActive"
        control={control}
        label="Active Status"
        options={[
          { value: true, label: "Active" },
          { value: false, label: "Inactive" },
        ]}
        required
      />
      <FormActions onCancel={onCancel} isSubmitting={isSubmitting} />
    </Box>
  );
};

export default AddUserForm;
