import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// SoC: separate of concerns (Separação de preucuções )

// DTO - Data Transfer Object

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

// localhost:3333/appointments
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentsRepository = new AppointmentsRepository();

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;