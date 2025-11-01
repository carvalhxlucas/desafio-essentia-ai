import { sequelize, Patient, MedicalSlot } from './models';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const patients = await Patient.bulkCreate([
      {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
      },
      {
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(11) 97654-3210',
      },
      {
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        phone: '(11) 96543-2109',
      },
    ]);

    const now = new Date();
    const slots = [];

    for (let i = 0; i < 10; i++) {
      const startTime = new Date(now);
      startTime.setDate(startTime.getDate() + i);
      startTime.setHours(9 + (i % 8), 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      slots.push({
        start_time: startTime,
        end_time: endTime,
        is_available: true,
      });
    }

    await MedicalSlot.bulkCreate(slots);

    console.log('Banco de dados populado com sucesso!');
    console.log(`${patients.length} pacientes criados`);
    console.log(`${slots.length} slots médicos criados`);
    console.log('Pacientes:', patients.map((p) => ({ id: p.id, name: p.name })));
    console.log('Slots:', slots.map((s, i) => ({ id: i + 1, start_time: s.start_time })));

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

seedDatabase();

