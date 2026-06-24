import { prisma } from "@/lib/db/prisma";

export async function createApp(data: {
  name: string;
  description?: string;
  config: any;
}) {
  return prisma.app.create({
    data: {
      name: data.name,
      description: data.description,
      config: data.config,
    },
  });
}

export async function getApps() {
  return prisma.app.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getApp(id: string) {
  return prisma.app.findUnique({
    where: {
      id,
    },
  });
}

export async function updateApp(
  id: string,
  data: {
    name: string;
    description?: string;
    config: any;
  }
) {
  return prisma.app.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      config: data.config,
    },
  });
}

export async function deleteApp(id: string) {
  return prisma.app.delete({
    where: {
      id,
    },
  });
}