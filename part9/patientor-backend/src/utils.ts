import { NewPatient, Gender, NewEntry, Diagnose, Discharge, HealthCheckRating, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isNumber = (value: unknown): boolean => {
  return typeof value === 'number';
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
 };

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
 };

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
 };

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description: ' + description);
	}
	return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist: ' + specialist);
	}
	return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCode = (diagnosisCode: any): Array<Diagnose['code']> | undefined => {
  if (!diagnosisCode) return undefined;
	if (!Array.isArray(diagnosisCode)) {
    throw new Error('Incorrect or missing diagnosis array: ' + diagnosisCode);
  }
	if (diagnosisCode.find((diagnosisCode) => typeof diagnosisCode !== 'string')) {
    throw new Error('Incorrect array item types, must be strings: ' + diagnosisCode);
  }
	
	return diagnosisCode as Array<Diagnose['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object : any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

  return newPatient;
};

const parseEntry = (entry: unknown): NewEntry => {
  if (!entry || Object(entry) === null || !parseEntryType(entry as NewEntry)) throw new Error('Incorrect entry or entry type: ' + entry);
  return entry as NewEntry;
};

const parseCriteria = (criteria: unknown): string => {
	if (!criteria || !isString(criteria)) {
		throw new Error('Incorrect or missing criteria: ' + criteria);
	}
	return criteria;
};

const parseDischarge = (discharge: Discharge): Discharge => {
	if (!discharge || Object(discharge) === null || Object.keys(discharge).length !== 2) {
    throw new Error ('Incorrect or missing discharge: ' + discharge);
  }

	if (!discharge.date) {
		throw new Error ('Incorrect or missing discharge date: ' + discharge);
	}

	if (!discharge.criteria) {
		throw new Error ('Incorrect or missing discharge criteria ' + discharge);
	}

	return {
		date: parseDate(discharge.date),
		criteria: parseCriteria(discharge.criteria)
	};
};

const isInHealthCheckRating = (healthCheckRating: number): boolean => {
	return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
	if (!healthCheckRating || !isNumber(healthCheckRating) || !isInHealthCheckRating(healthCheckRating as number)) {
		throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
	}
	return healthCheckRating as number;
};

const parseEmployerName = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing employerName: ' + employerName);
	}
	return employerName;
};

const parseSickLeave = (sickLeave: SickLeave): SickLeave => {
	if (!sickLeave || Object(sickLeave) === null) {
		throw new Error ('Incorrect or missing field sickLeave: ' + sickLeave);
	}

	if (!sickLeave.startDate) {
		throw new Error ('Incorrect or missing start date: ' + sickLeave);
	}

	if (!sickLeave.endDate) {
		throw new Error ('Incorrect or missing end date: ' + sickLeave);
	}

	return {
		startDate: parseDate(sickLeave.startDate),
		endDate: parseDate(sickLeave.endDate)
	};
};



const parseEntryType = (entry: NewEntry) => {
  if (entry.type === 'HealthCheck') return true;
	if (entry.type === 'Hospital') return true;
	if (entry.type === 'OccupationalHealthcare') return true;
	return false;
};

export const toNewEntry = (entry: NewEntry): NewEntry => {
  const validEntry = parseEntry(entry);

	validEntry.description = parseDescription(validEntry.description);
	validEntry.date = parseDate(validEntry.date);
	validEntry.specialist = parseSpecialist(validEntry.specialist);
	validEntry.diagnosisCodes = parseDiagnosisCode(validEntry.diagnosisCodes);

	switch(validEntry.type) {
		case 'Hospital':
			validEntry.discharge = parseDischarge(validEntry.discharge);
			return validEntry;
		case 'HealthCheck':
			validEntry.healthCheckRating = parseHealthCheckRating(validEntry.healthCheckRating);
			return validEntry;
		case 'OccupationalHealthcare': {
			validEntry.employerName = parseEmployerName(validEntry.employerName);
			if (validEntry.sickLeave) {
				validEntry.sickLeave = parseSickLeave(validEntry.sickLeave);
			}
			return validEntry;
		}
		default:
			throw new Error(
        `Invalid entry type: ${entry}`
      );
	}
};

export default toNewPatient;