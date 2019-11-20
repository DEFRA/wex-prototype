const express = require('express')
const router = express.Router()

var folder = "registration-v1"

router.use(function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  res.locals.folder=folder
  next()
});

// /start POST action is hard coded to /start-check

// Start new, re-reg or change first page
router.post('/start-check', function (req, res) {
  let registerChoice = req.session.data['registerChoice']

  if (registerChoice === 'startNew') {
    res.redirect('/' + folder + '/country')
  } else if (registerChoice === 'reRegister') {
    res.redirect('/' + folder + '/country')
  } else if (registerChoice === 'change') {
    res.redirect('/' + folder + '/contact-ea')
  } else {
    res.redirect('/' + folder + '/start')
  }
})

// /country POST action hardcoded to /country-check

// Country check
router.post('/country-check', function (req, res) {
  let countryChoice = req.session.data['countryChoice']

  if (countryChoice === 'England') {
    res.redirect('/' + folder + '/exemptions?formAction=app-contact-name')
  } else {
    res.redirect('/' + folder + '/country-not-england')
  }
})

// exemptions
router.post('/exemptions', function (req, res) {
  res.render(folder + '/exemptions',{
    "formAction":"/app-contact-name"
  })
})

// app-contact-name
router.post('/app-contact-name', function (req, res) {
  res.render(folder + '/app-contact-name',{
    "formAction":"app-telephone-number"
  })
})

// /app-telephone-number
router.post('/app-telephone-number', function (req, res) {
  res.render(folder + '/app-telephone-number',{
    "formAction":"app-email"
  })
})

// /app-email
router.post('/app-email', function (req, res) {
  res.render(folder + '/app-email',{
    "formAction":"operator-type"
  })
})

// Operator type is hard-coded to /operator-type-check
// which fredirects gto /op-limited-company-reg-number
router.post('/operator-type-check', function (req, res) {
  let operatorType = req.session.data['operatorType']

  if (operatorType === 'Limited company') {
    res.redirect('/' + folder + '/op-limited-company-reg-number?formAction=op-limited-company-name')
  } else if (operatorType === 'Individual or sole trader') {
    res.redirect('/' + folder + '/op-individual-name-choice?formAction=op-individual-name-choice-check')
  } else if (operatorType === 'Partnership') {
    res.redirect('/' + folder + '/op-partner-1-name-choice?formAction=op-partner-1-name-choice-check')
  } else {
    res.redirect('/' + folder + '/op-type-not-covered')
  }
})

// INDIVIDUAL ================================================

router.post('/op-individual-name-choice', function (req, res) {
  res.render(folder + '/op-individual-name-choice',{
    "formAction":"op-individual-name-choice-check"
  })
})

router.post('/op-individual-name-choice-check', function (req, res) {
  let opIndividualNameChoice = req.session.data['opIndividualNameChoice']

  if (opIndividualNameChoice === 'useAppName') {
    req.session.data.individualFirstName = req.session.data['appFirstName']
    req.session.data.individualLastName = req.session.data['appLastName']
    res.redirect('/' + folder + '/op-individual-postcode?formAction=op-individual-address')
  } else {
    res.redirect('/' + folder + '/op-individual-name?formAction=op-individual-postcode')
  }
})

router.post('/op-individual-name', function (req, res) {
  res.render(folder + '/op-individual-name',{
    "formAction":"op-individual-postcode"
  })
})

router.post('/op-individual-postcode', function (req, res) {
  res.render(folder + '/op-individual-postcode',{
    "formAction":"op-individual-address"
  })
})

router.post('/op-individual-address', function (req, res) {
  res.render(folder + '/op-individual-address',{
    "formAction":"op-contact-name-choice"
  })
})


// COMPANY ================================================
router.post('/op-limited-company-name', function (req, res) {
  res.render(folder + '/op-limited-company-name',{
    "formAction":"op-limited-company-postcode"
  })
})

router.post('/op-limited-company-postcode', function (req, res) {
  res.render(folder + '/op-limited-company-postcode',{
    "formAction":"op-limited-company-address"
  })
})

router.post('/op-limited-company-address', function (req, res) {
  res.render(folder + '/op-limited-company-address',{
    "formAction":"op-contact-name-choice"
  })
})

// PARTNER ================================================

router.post('/op-partner-1-name-choice', function (req, res) {
  res.render(folder + '/op-partner-1-name-choice',{
    "formAction":"op-partner-1-name-choice-check"
  })
})

router.post('/op-partner-1-name-choice-check', function (req, res) {
  let opPartnerNameChoice = req.session.data['opPartnerNameChoice']

  if (opPartnerNameChoice === 'useAppName') {
    req.session.data.opPartner1FirstName = req.session.data['appFirstName']
    req.session.data.opPartner1LastName = req.session.data['appLastName']
    res.redirect('/' + folder + '/op-partner-name-2?formAction=op-partnership-name')
  } else {
    res.redirect('/' + folder + '/op-partner-name-1?formAction=op-partner-name-2')
  }
})

router.post('/op-partner-name-1', function (req, res) {
  res.render(folder + '/op-partner-name-1',{
    "formAction":"/op-partner-name-2"
  })
})

router.post('/op-partner-name-2', function (req, res) {
  res.render(folder + '/op-partner-name-2',{
    "formAction":"op-partnership-name"
  })
})

router.post('/op-partnership-name', function (req, res) {
  res.render(folder + '/op-partnership-name',{
    "formAction":"op-partnership-postcode"
  })
})

router.post('/op-partnership-postcode', function (req, res) {
  res.render(folder + '/op-partnership-postcode',{
    "formAction":"op-partnership-address"
  })
})

router.post('/op-partnership-address', function (req, res) {
  res.render(folder + '/op-partnership-address',{
    "formAction":"op-contact-name-choice"
  })
})


// CONTACT ================================================

router.post('/op-contact-name-choice', function (req, res) {
  res.render(folder + '/op-contact-name-choice',{
    "formAction":"op-contact-name-choice-check"
  })
})

router.post('/op-contact-name-choice-check', function (req, res) {
  let opContactNameChoice = req.session.data['opContactNameChoice']

  if (opContactNameChoice === 'useAppName') {
    req.session.data.opFirstName = req.session.data['appFirstName']
    req.session.data.opLastName = req.session.data['appLastName']
    req.session.data.opContactEmail = req.session.data['appEmail']
    req.session.data.opContactTelephone = req.session.data['appTelephone']
    res.redirect('/' + folder + '/address-choice-1?formAction=address-choice-1-check')

  } else if (opContactNameChoice === 'useOpName' || opContactNameChoice === 'usePart2Name') {
    req.session.data.opFirstName = req.session.data['individualFirstName']
    req.session.data.opLastName = req.session.data['individualLastName']
    res.redirect('/' + folder + '/op-contact-telephone?formAction=op-contact-telephone')

  } else {
    res.redirect('/' + folder + '/op-contact-name?formAction=op-contact-telephone')
  }
})

router.post('/op-contact-name', function (req, res) {
  res.render(folder + '/op-contact-name',{
    "formAction":"op-contact-telephone"
  })
})

router.post('/op-contact-telephone', function (req, res) {
  res.render(folder + '/op-contact-telephone',{
    "formAction":"op-contact-email"
  })
})

router.post('/op-contact-email', function (req, res) {
  res.render(folder + '/op-contact-email',{
    "formAction":"address-choice-1"
  })
})

router.post('/address-choice-1', function (req, res) {
  res.render(folder + '/address-choice-1',{
    "formAction":"address-choice-1-check"
  })
})

router.post('/address-choice-1-check', function (req, res) {
  let addressChoice1 = req.session.data['addressChoice1']

  if (addressChoice1 === 'useIndividualAddress') {
    req.session.data.opContactPostcode = req.session.data['individualPostcode']
    req.session.data.opContactAddress = req.session.data['individualAddress']
    res.redirect('/' + folder + '/farm?formAction=farmer')

  } else if (addressChoice1 === 'usePartnershipAddress') {
    req.session.data.opContactPostcode = req.session.data['opPartnershipPostcode']
    req.session.data.opContactAddress = req.session.data['opPartnershipAddress']
    res.redirect('/' + folder + '/farm?formAction=farmer')

  } else if (addressChoice1 === 'useCompanyAddress') {
    req.session.data.opContactPostcode = req.session.data['opLtdCompanyPostcode']
    req.session.data.opContactAddress = req.session.data['opLtdCompanyAddress']
    res.redirect('/' + folder + '/farm?formAction=farmer')

  } else {
    res.redirect('/' + folder + '/op-contact-postcode?formAction=op-contact-address')
  }
})


router.post('/op-contact-postcode', function (req, res) {
  res.render(folder + '/op-contact-postcode',{
    "formAction":"op-contact-address"
  })
})

router.post('/op-contact-address', function (req, res) {
  res.render(folder + '/op-contact-address',{
    "formAction":"farm"
  })
})

router.post('/farm', function (req, res) {
  res.render(folder + '/farm',{
    "formAction":"farmer"
  })
})

router.post('/farmer', function (req, res) {
  res.render(folder + '/farmer',{
    "formAction":"site-location-choice"
  })
})

router.post('/site-location-choice', function (req, res) {
  res.render(folder + '/site-location-choice',{
    "formAction":"site-location-check"
  })
})

// Start new, re-reg or change first page
router.post('/site-location-check', function (req, res) {
  let siteLocationChoice = req.session.data['siteLocationChoice']

  if (siteLocationChoice === 'gridReference') {
    res.redirect('/' + folder + '/site-grid-reference?formAction=check-answers')
  } else {
    res.redirect('/' + folder + '/address-choice-site?formAction=address-choice-site-check')
  }
})

router.post('/address-choice-site', function (req, res) {
  res.render(folder + '/address-choice-site',{
    "formAction":"address-choice-site-check"
  })
})

router.post('/address-choice-site-check', function (req, res) {
  let addressChoiceSite = req.session.data['addressChoiceSite']

  if (addressChoiceSite === 'useIndividualAddress') {
    req.session.data.sitePostcode = req.session.data['individualPostcode']
    req.session.data.siteAddress = req.session.data['individualAddress']
    res.redirect('/' + folder + '/check-answers?formAction=declaration')

  } else if (addressChoiceSite === 'usePartnershipAddress') {
    req.session.data.sitePostcode = req.session.data['opPartnershipPostcode']
    req.session.data.siteAddress = req.session.data['opPartnershipAddress']
    res.redirect('/' + folder + '/check-answers?formAction=declaration')

  } else if (addressChoiceSite === 'useCompanyAddress') {
    req.session.data.sitePostcode = req.session.data['opLtdCompanyPostcode']
    req.session.data.siteAddress = req.session.data['opLtdCompanyAddress']
    res.redirect('/' + folder + '/check-answers?formAction=declaration')

  } else if (addressChoiceSite === 'useContactAddress') {
    req.session.data.sitePostcode = req.session.data['opContactPostcode']
    req.session.data.siteAddress = req.session.data['opContactAddress']
    res.redirect('/' + folder + '/check-answers?formAction=declaration')
  } else {
    res.redirect('/' + folder + '/site-postcode')
  }
})


router.post('/site-grid-reference', function (req, res) {
  res.render(folder + '/site-grid-reference',{
    "formAction":"check-answers"
  })
})

// ####### GET for address alternative
router.get('/site-postcode', function (req, res) {
  res.render(folder + '/site-postcode',{
    "formAction":"site-address"
  })
})

router.post('/site-address', function (req, res) {
  res.render(folder + '/site-address',{
    "formAction":"check-answers"
  })
})


router.post('/check-answers', function (req, res) {
  res.render(folder + '/check-answers',{
    "formAction":"declaration"
  })
})

router.post('/declaration', function (req, res) {
  res.render(folder + '/declaration',{
    "formAction":"registration-complete"
  })
})



// Sample data: company
const companySampleData = {
  registerChoice:'startNew',
  regNumber:'WEX339257',
  countryChoice:'England',
  appFirstName:'Rachel',
  appLastName:'Conway',
  appTelephoneNumber:'0117 978 1234',
  appEmail:'mike@ap-email.com',
  appEmailConfirm:'mike@ap-email.com',
  operatorType:'Partnership',
  opLtdCompanyRegNumber:'AB123456',
  opLtdCompanyName:'Farm Techniques Ltd',
  opLtdCompanyPostcode:'BS4 5FT',
  opLtdCompanyAddress:'9a, GRANGE ROAD, BRISTOL',
  individualName:'Sarah Individual',
  individualPostcode:'BS34 9GH',
  individualAddress:'9a, GRANGE ROAD, BRISTOL',
  opPartner1FirstName:'Roger',
  opPartner1LastName:'Brown',
  opPartner2FirstName:'Jane',
  opPartner2LastName:'Brown',
  opPartnershipName:'Our Waste Partnership',
  opPartnershipPostcode:'BS34 9GH',
  opPartnershipAddress:'9a, GRANGE ROAD, BRISTOL',
  opFirstName:'Bruce',
  opLastName:'Patel',
  opContactPosition:'Site manager',
  opContactTelephone:'07806 123 456',
  opContactEmail:'darici@mailinator.net',
  opContactEmailConfirm:'darici@mailinator.net',
  opContactPostcode:'BS34 9GH',
  opContactAddress:'9a, GRANGE ROAD, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST 58132 72695',
  siteDescription:'Lower field, Oak Tree Farm. Parcel ED/1234',
  siteAddressNumber: 'Oak Farm',
  siteAddress1: 'Windmill Lane',
  siteAddress2: 'Rosehurst',
  siteTown: 'Cullingford',
  Exemptions: [
    'U1',
    'U8',
    'T1',
    'D7',
    'S2',
    'S3'
  ]
}

// Load sample data
router.get('/sample', function (req, res) {
    req.session.data = companySampleData
    res.redirect('/' + folder + '/renew-check-answers')
})



module.exports = router
