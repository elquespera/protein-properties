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


// Amino acid contributions to extinction coefficient at 280nm
const WYC_COEFF = {
	W: 5500,
	Y: 1490,
	C: 125
}

// Calculate protein extinction coefficient at 280nm
//using ε = (nW x 5500) + (nY x 1490) + (nC x 125)
function calculateEcoeff280nm (sequence) {
	let E = null;
	sequence = sequence.toUpperCase();
	Object.entries(WYC_COEFF).forEach(entry =>  {
		let n = sequence.match(new RegExp(entry[0], 'g'));
		if (n != null) E += n.length * entry[1];
	})
	return E;
}	

//Extinction coefficient of a peptide bond, M-1*cm-1 at 214nm
ePeptideBond = 923; 

//Extinction coefficients of individual amino acids, M-1*cm-1 at 214nm
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

// N-terminal proline contribution at 214nm	
const eeP_Nterm = 30;

// Calculate protein extinction coefficient at 214nm
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

