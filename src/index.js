import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Manager from './entities/Manager.js';

dotenv.config();
mongoose.connect(process.env.DB_URL, () => console.log('connected to DB'));

function readCsv() {
  const data = fs.readFileSync(path.resolve('src/input/managers.csv'), 'utf8');
  const lines = data.split('\n');
  const managers = [];
  lines.forEach((line, index) => {
    const splitted = line.split(',');
    const manager = {
      gerencia: splitted[0],
      nome: splitted[1],
      email: splitted[2],
      cargo: splitted[3],
    };
    if (index > 0 && !Object.values(manager).includes(undefined)) {
      managers.push(manager);
    }
  });

  return managers;
}

async function csvToMongodb() {
  const managers = readCsv();
  managers.forEach(async (manager) => {
    await Manager.create(manager);
  });
}

csvToMongodb();
