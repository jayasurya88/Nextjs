const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_link: string;
  live_demo_link?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects/`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_URL}/services/`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

export const submitContact = async (data: ContactForm): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
  return response.json();
}; 