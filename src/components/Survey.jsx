import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
  CircularProgress,
  Container,
  Paper,
  alpha
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routeConfig';

const Survey = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const [listSurvey, setListSurvey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const watchAllFields = watch();

  useEffect(() => {
    const isSurveyDone = localStorage.getItem("is_survey_done");
    if ( user && isSurveyDone === "true") {
      navigate(routes.virtual_interview);
    } else if (!user) {
      navigate(routes.login);
    }
  }, [user])

  const onSubmit = async (data) => {
    const payload = [{
      candidate_id: user.sub.id,
      description: data.description,
      status: "1",
      Answer: data
    }];

    try {
      setLoadingBtn(true);
      const response = await axios.post(`${rootAPI}/predict`, payload);
      showAlert({
        message: "Submit survey successfully",
        type: 'success',
      });


    } catch (err) {
      showAlert({
        message: "Something went wrong",
        type: 'error',
      });
    } finally {
      setLoadingBtn(false);
      localStorage.setItem("is_survey_done", "true");
      navigate(routes.virtual_interview);
    }
  };

  const getListSurvey = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${rootAPI}/random_questions`);
      setListSurvey(res.data);
      res.data.forEach(survey => {
        setValue(survey.ID, '');
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListSurvey();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md" className='p-2 sm:py-12 sm:px-36'>
      <div className="flex items-center text-center mb-10">
        <Button variant="text" sx={{
          color: "#052b4c",
          width: "fit-content",
        }}>
          <h1 className="font-bold text-3xl">Personality Test</h1>
        </Button>
      </div>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <img src="/assets/images/survey.webp" alt="Survey" style={{ maxWidth: '100%' }} />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {listSurvey.map((survey, index) => (
            <FormControl
              key={survey.ID}
              fullWidth
              margin="normal"
              sx={{
                mb: 4,
                opacity: watchAllFields[survey.ID] ? 0.5 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              <FormLabel sx={{ fontSize: '1.2rem', fontWeight: 'bold', mb: 2, color: "#19344e" }}>{survey.Question}</FormLabel>
              <Controller
                name={survey.ID}
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    row
                    sx={{
                      justifyContent: 'space-between',
                      '& .MuiFormControlLabel-label': { fontSize: '1rem' }
                    }}
                  >
                    {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, value) => (
                      <FormControlLabel key={value} value={String(value + 1)} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
          ))}

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={10}
                margin="normal"
                label="What should we change in order to live up to your expectations?"
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1.2rem' }
                }}
                sx={{ mb: 4 }}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loadingBtn}
              startIcon={loadingBtn && <CircularProgress size={24} color="inherit" />}
              sx={{
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                minWidth: '300px',
                backgroundColor: "#10a1fc",
              }}
            >
              Send Survey
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Survey;