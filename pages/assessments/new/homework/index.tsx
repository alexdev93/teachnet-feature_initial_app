import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Stepper from 'src/components/common/Stepper';
import AppBarLayout from 'src/layouts/AppBarLayout';
import TextField from 'src/components/common/TextField';
import Button from 'src/components/common/Button';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface Material {
  id: number;
  file: File;
}

const CreateHomework: React.FC = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 5; // Update the total steps to 5
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [materials, setMaterials] = useState<Material[]>([]);

  const handleNext = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, totalSteps));
  };

  const handleBack = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newMaterials = Array.from(event.target.files).map(file => ({
        id: Date.now() + Math.random(),
        file,
      }));
      setMaterials([...materials, ...newMaterials]);
    }
  };

  const handleRemoveMaterial = (id: number) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const handleSubmit = () => {
    console.log({ title, instructions, materials });
    if (router.query.redirectTo) {
      router.push(router.query.redirectTo as string);
    }
    // Handle submission logic here
  };

  const handleAssignImmediately = () => {
    console.log('Assigning homework immediately...');
    // Handle the logic to assign the homework immediately
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <Box>
            <Typography variant='h6' gutterBottom textAlign='center'>
              Create a Title for the Homework
            </Typography>
            <TextField
              fullWidth
              label='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              margin='normal'
              required
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant='h6' gutterBottom textAlign='center'>
              Write Instructions on how to complete the Homework
            </Typography>
            <TextField
              fullWidth
              label='Instructions'
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              margin='normal'
              multiline
              rows={4}
              required
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant='h6' gutterBottom textAlign='center'>
              Add additional materials for the Homework
            </Typography>
            <input
              accept='*/*'
              style={{ display: 'none' }}
              id='raised-button-file'
              multiple
              type='file'
              onChange={handleFileUpload}
            />
            <label htmlFor='raised-button-file'>
              <Button variant='contained' component='span'>
                Upload Materials
              </Button>
            </label>
            <List>
              {materials.map(material => (
                <ListItem key={material.id}>
                  <ListItemText primary={material.file.name} />
                  <IconButton onClick={() => handleRemoveMaterial(material.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant='h6' gutterBottom textAlign='center'>
              Review and Submit
            </Typography>
            <Typography variant='h6' gutterBottom>
              Title
            </Typography>
            <Typography variant='body1' gutterBottom>
              {title}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' gutterBottom>
              Instructions
            </Typography>
            <Typography variant='body1' gutterBottom>
              {instructions}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' gutterBottom>
              Materials
            </Typography>
            <List>
              {materials.map(material => (
                <ListItem key={material.id}>
                  <ListItemText primary={material.file.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 5:
        return (
          <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <Typography variant='h6' gutterBottom textAlign='center'>
              Would you like to assign this homework immediately?
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={handleAssignImmediately}
              sx={{ display: 'block', mx: 'auto', mt: 2 }}
            >
              Assign this activity
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <AppBarLayout>
      <Container maxWidth='md' sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: '20px', width: '100%' }}>
          {/* <Typography variant='h4' gutterBottom align='center'>
          Create Homework
        </Typography> */}
          <Stepper currentStep={activeStep} totalSteps={totalSteps} />
          <Box sx={{ height: '500px', overflowY: 'auto', mb: 2, mt: 6 }}>{renderStepContent()}</Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 1}>
              Back
            </Button>
            {activeStep < totalSteps ? (
              <Button variant='contained' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant='contained' onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </AppBarLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'assessments'])),
  },
});

export default CreateHomework;
