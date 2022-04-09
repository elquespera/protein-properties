//Molecular weights of individual amino acids
const MW_AA = {
		A:71.037114,
		R:156.101111,
		N:114.042927,
		D:115.026943,
		C:103.009185,
		Q:128.058578,
		E:129.042593,
		G:57.021464,
		H:137.058912,
		I:113.084064,
		L:113.084064,
		K:128.094963,
		M:131.040485,
		F:147.068414,
		P:97.052764,
		S:87.032028,
		T:101.047679,
		W:186.079313,
		Y:163.06332,
		V:99.068414};

// Calculates molecular weight from a given sequence
function calculateMW (sequence) {
	let MW = 0;
	sequence = sequence.toUpperCase();
	for (let i = 0; i < sequence.length; i++) {
		aa = sequence.charAt(i);
		if (MW_AA[aa] != undefined) {
			MW += MW_AA[aa];
		}
	}
	return MW;
}


//Extinction coefficient of a peptide bond, M-1*cm-1
ePeptideBond = 923; 

//Extinction coefficients of individual amino acids, M-1*cm-1
const eAA = { 
		A:32,
		R:102,
		N:136,
		D:58,
		C:225,
		Q:142,
		E:78,
		G:21,
		H:5125,
		I:45,
		L:45,
		K:41,
		M:980,
		F:5200,
		P:2675,
		S:34,
		T:41,
		W:29050,
		Y:5375,
		V:43};

// N-terminal proline contribution		
const eeP_Nterm = 30;

function calculateEcoeff214nm (sequence) {
	let E = 0;
	previousAA = false;
	sequence = sequence.toUpperCase();
	for (let i = 0; i < sequence.length; i++) {
		aa = sequence.charAt(i);
		if (eAA[aa] != undefined) {
			if (aa == 'P' & !previousAA) {
				E += eeP_Nterm;

			} else {
				E += eAA[aa];
			}
			if (previousAA) 
				{ E += ePeptideBond }
			previousAA = true;
		}
	}
	return E;
}

