const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Ruta GET devuelve un status 200", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it("Respuesta de ruta GET es un objeto", async () => {
    const { body } = await request(server).get("/cafes").send();
    const cafes = body;
    expect(cafes).toBeInstanceOf(Object);
  });

  it("Error 404 al intentar borrar un ID inexistente", async () => {
    const idDeCafeAEliminar = Math.floor(Math.random() * 999);
    const jwt = "token";

    const response = await request(server)
      .delete(`/cafes/${idDeCafeAEliminar}`)
      .set("Authorization", jwt)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });

  it("Ruta POST agrega un nuevo cafe", async () => {
    const id = Math.floor(Math.random() * 999);
    const nuevoCafe = { id, nombre: "Nuevo Cafe" };
    const { body: cafes } = await request(server)
      .post("/cafes")
      .send(nuevoCafe);

    expect(cafes).toContainEqual(nuevoCafe);
  });

  it("Ruta POST devuelve status 201", async () => {
    const id = Math.floor(Math.random() * 999);
    const nuevoCafe = { id, nombre: "Nuevo Cafe" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    const status = response.statusCode;
    expect(status).toBe(201);
  });

  it("Ruta PUT devuelve status 400 si ID en params es distinto a ID payload", async () => {
    const idCafeParams = Math.floor(Math.random() * 999);
    const idPayload = Math.floor(Math.random() * 999);
    const cafeModificado = { idPayload, nombre: "Cafe Modificado" };
    const response = await request(server)
      .put(`/cafes/${idCafeParams}`)
      .send(cafeModificado);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
