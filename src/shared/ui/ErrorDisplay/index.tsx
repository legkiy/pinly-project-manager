import { CloseRounded, ExpandMoreRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { Text } from '@/shared/ui';

interface FallbackComponentProps extends FallbackProps {
  error: Error;
}

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackComponentProps) => {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack gap={1}>
        <IconButton onClick={resetErrorBoundary} sx={{ ml: 'auto' }}>
          <CloseRounded />
        </IconButton>
        <Accordion
          elevation={0}
          sx={{
            borderRadius: 2,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography variant="h6" color="error">
              <Text mess={error.message} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                bgcolor: 'grey.800',
                color: 'grey.100',
                p: 1,
                borderRadius: 1,
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                overflowX: 'auto',
              }}
            >
              <pre>
                {error.stack?.split('\n').map((line, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    {line}
                  </div>
                ))}
              </pre>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Container>
  );
};

const ErrorDisplay = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorDisplay;
