import { Form } from 'vform'

// initial value
const masterfileDefaultForm = {
  primekey: localStorage.getItem('primekey'),
  avatar__: 'https://randomuser.me/api/portraits/lego/5.jpg',
  empl_cde: '',
  empl_cd2: '',
  asso_cde: '',
  chro_num: '',
  last_nme: '',
  frst_nme: '',
  midl_nme: '',
  midl_ini: '',
  nickname: '',
  birthday: '',
  sex_____: '',
  cvilstat: '',
  address1: '',
  address2: '',
  address3: '',
  cel_numb: '',
  dte_hire: '',
  dte_rglr: '',
  dte_rsgn: '',
  dte_eoc_: '',
  pos_code: '',
  emp_stat: 'P',
  workstat: 'A',
  workarea: '',
  grp_lvl1: '',
  grp_lvl2: '',
  grp_lvl3: '',
  min_wage: 'F',
  trainee_: 'F',
  shft_cde: '',
  alw_flex: 'F',
  compweek: 'F',
  rest_day: '7',
  rest_da2: '0',
  bio_reqd: 'T',
  tmeinout: 'T',
  earlytme: 'F',
  alw_ot__: 'T',
  alw_nsd_: 'T',
  alw_hol_: 'T',
  tax_numb: '',
  sss_numb: '',
  pag_ibig: '',
  philhlth: '',
  rate_typ: 'M',
  alw_payr: 'T',
  paygroup: '',
  comp_sss: 'T',
  comp_med: 'T',
  comp_pgi: 'T',
  comp_tax: 'T',
  tax_type: 'C',
  tax_over: 'F',
  pgbig_cd: '2',
  bankfile: '',
  acct_typ: 'X',
  acct_num: ''
}

// edit
const masterfileEditForm = {
  primekey: '',
  avatar__: '',
  empl_cde: '',
  empl_cd2: '',
  asso_cde: '',
  chro_num: '',
  last_nme: '',
  frst_nme: '',
  midl_nme: '',
  midl_ini: '',
  nickname: '',
  birthday: '',
  sex_____: '',
  cvilstat: '',
  address1: '',
  address2: '',
  address3: '',
  cel_numb: '',
  dte_hire: '',
  dte_rglr: '',
  dte_rsgn: '',
  dte_eoc_: '',
  pos_code: '',
  emp_stat: '',
  workstat: '',
  workarea: '',
  grp_lvl1: '',
  grp_lvl2: '',
  grp_lvl3: '',
  min_wage: '',
  trainee_: '',
  shft_cde: '',
  alw_flex: '',
  compweek: '',
  rest_day: '',
  rest_da2: '',
  bio_reqd: '',
  tmeinout: '',
  earlytme: '',
  alw_ot__: '',
  alw_nsd_: '',
  alw_hol_: '',
  tax_numb: '',
  sss_numb: '',
  pag_ibig: '',
  philhlth: '',
  rate_typ: '',
  alw_payr: '',
  paygroup: '',
  comp_sss: '',
  comp_med: '',
  comp_pgi: '',
  comp_tax: '',
  tax_type: '',
  tax_over: '',
  pgbig_cd: '',
  bankfile: '',
  acct_typ: '',
  acct_num: ''
}

// final form
const masterfileForm = new Form({
  primekey: '',
  avatar__: '',
  empl_cde: '',
  empl_cd2: '',
  asso_cde: '',
  chro_num: '',
  last_nme: '',
  frst_nme: '',
  midl_nme: '',
  midl_ini: '',
  nickname: '',
  birthday: '',
  sex_____: '',
  cvilstat: '',
  address1: '',
  address2: '',
  address3: '',
  cel_numb: '',
  dte_hire: '',
  dte_rglr: '',
  dte_rsgn: '',
  dte_eoc_: '',
  pos_code: '',
  emp_stat: '',
  workstat: '',
  workarea: '',
  grp_lvl1: '',
  grp_lvl2: '',
  grp_lvl3: '',
  min_wage: '',
  trainee_: '',
  shft_cde: '',
  alw_flex: '',
  compweek: '',
  rest_day: '',
  rest_da2: '',
  bio_reqd: '',
  tmeinout: '',
  earlytme: '',
  alw_ot__: '',
  alw_nsd_: '',
  alw_hol_: '',
  tax_numb: '',
  sss_numb: '',
  pag_ibig: '',
  philhlth: '',
  rate_typ: '',
  alw_payr: '',
  paygroup: '',
  comp_sss: '',
  comp_med: '',
  comp_pgi: '',
  comp_tax: '',
  tax_type: '',
  tax_over: '',
  pgbig_cd: '',
  bankfile: '',
  acct_typ: '',
  acct_num: ''
})

export { masterfileDefaultForm, masterfileEditForm, masterfileForm }
