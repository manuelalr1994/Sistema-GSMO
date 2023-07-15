import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from './entities/actions-log.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { emptyArray } from 'src/common/validators/empty.validator';


interface IAction {
  timestamp: string;
  endpoint: string;
  user: string;
  method: string;
  logs: Ilog[];
}

interface Ilog {
  id: number;
  table: string;
  action: string;
  json?: object;
}

@Injectable()
export class ActionService {

  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(Action)
    private readonly repository: Repository<Action>,
  ) {}


  async addLog(id, table, action, json?) {

    const log: Ilog = {
      id,
      table,
      action,
      json
    };

    if (!this.request.body.logs) {
      this.request.body.logs = [log];
      return;
    }
    
    this.request.body.logs = [...this.request.body.logs, log];
  }

  async create(
    endpoint: string,
    user: string,
    method: string
  ) {

    const logs = this.request.body.logs || [];

    if (emptyArray(logs)) return;

    const timestamp = new Date().toLocaleString("es-MX", { timeZone: "America/Phoenix" })
      .replace(/,/g, '')
      .replace(/\//g, '-') + " GMT-7";

    const createAction: IAction = {
      timestamp,
      endpoint,
      user,
      method,
      logs
    }

    const action = this.repository.create(createAction);
    await this.repository.save(action)
  }
}
