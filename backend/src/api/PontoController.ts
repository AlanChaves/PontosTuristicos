import { NextFunction, Request, Response } from "express";
import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Ponto } from "../entity/Ponto";
import responses from "../functions/responses";

function validate(ponto: Ponto) {
  const errors: String[] = [];

  if (ponto.name === undefined || ponto.name.trim() === "") {
    errors.push("field name required");
  }
  if (ponto.description === undefined || ponto.description.trim() === "") {
    errors.push("field description required");
  }
  if (ponto.city === undefined || ponto.city.trim() === "") {
    errors.push("field city required");
  }
  if (ponto.state === undefined || ponto.state.trim() === "") {
    errors.push("field state required");
  }
  if (ponto.reference === undefined || ponto.reference.trim() === "") {
    errors.push("field reference required");
  }

  return errors;
}

export async function insert(request: Request, response: Response) {
  try {
    const repository = AppDataSource.getRepository(Ponto);
    const ponto = request.body;

    const errors = validate(ponto);
    if (errors.length > 0) {
      return responses.sendInvalidSyntax(response, errors);
    }

    const data = await repository.save(ponto);
    return responses.sendSuccess(response, data);
  } catch (error) {
    console.log(error);
    return responses.sendInternalError(response);
  }
}

export async function update(request: Request, response: Response) {
  const { id } = request.params;
  const modifieds = request.body;
  try {
    const repository = AppDataSource.getRepository(Ponto);
    const ponto = await repository.findOne({ where: { id: Number(id) } });
    if (!ponto) {
      return responses.sendNotFound(response, "ponto not found");
    }

    repository.merge(ponto, modifieds);

    const errors = validate(ponto);
    if (errors.length > 0) {
      console.log(errors);
      return responses.sendInvalidSyntax(response, errors);
    }

    await repository.save(ponto);
    return responses.sendSuccess(response, { id: id });
  } catch (error) {
    console.log(error);
    return responses.sendInternalError(response);
  }
}

export async function remove(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Ponto);
    const user = await repository.findOne({ where: { id: Number(id) } });
    if (!user) {
      return responses.sendNotFound(response, "ponto not found");
    }

    await repository.delete(id);
    return responses.sendSuccess(response, { id: id });
  } catch (error) {
    console.log(error);
    return responses.sendInternalError(response);
  }
}

export async function getPagination(request: Request, response: Response) {
  const { _page, _total, _search } = request.query;
  try {
    let skip = _page !== undefined ? Number(_page) : undefined;
    let take = _total !== undefined ? Number(_total) : undefined;

    if (skip && take) {
      skip *= take;
    }

    const repository = AppDataSource.getRepository(Ponto);

    if (_search !== undefined && _search !== "") {
      const wheres: FindOptionsWhere<Ponto>[] = [];
      wheres.push({
        name: Like(`%${_search}%`)
      });
      wheres.push({
        description: Like(`%${_search}%`)
      });
      wheres.push({
        reference: Like(`%${_search}%`)
      });
      wheres.push({
        city: Like(`%${_search}%`)
      });
      wheres.push({
        state: Like(`%${_search}%`)
      });

      const [data, count] = await repository.findAndCount({
        where: wheres, order: { name: "ASC" },
        skip: skip,
        take: take,
      });

      return responses.sendSuccess(response, { data: data, count: count });
    } else {
      const [data, count] = await repository.findAndCount({
        order: { insertedAt: "DESC" },
        skip: skip,
        take: take,
      });

      return responses.sendSuccess(response, { data: data, count: count });
    }


  } catch (error) {
    console.log(error);
    return responses.sendInternalError(response);
  }
}

export async function get(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Ponto);
    const ponto = await repository.findOne({ where: { id: Number(id) } });
    if (!ponto) {
      return responses.sendNotFound(response);
    }

    return responses.sendSuccess(response, ponto);
  } catch (error) {
    console.log(error);
    return responses.sendInternalError(response);
  }
}