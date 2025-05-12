import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';

@Injectable()
export class AiService {
  private aiUrl = 'http://localhost:5000/api'; // URL Flask server

  async uploadFile(filePath: string): Promise<any> {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post(`${this.aiUrl}/upload`, form, {
      headers: form.getHeaders(),
    });

    return response.data;
  }

  async getTrends(): Promise<any> {
    const response = await axios.get(`${this.aiUrl}/trends`);
    return response.data;
  }

  async getInventory(): Promise<any> {
    const response = await axios.get(`${this.aiUrl}/inventory`);
    return response.data;
  }
}
