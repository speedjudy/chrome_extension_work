var maxAgainNum = 0;
windowStatus = true;
metricMap = new Map();
notificationData = [];
searchDataParams = {
  metricName: '',
  metricId: '',
  companyName: '',
  companyId: '',
  companyMetricId: '',
  searched: false,
};
companies = [];
companyMetricMap = new Map();
const firebaseConfig = {
  apiKey: "AIzaSyBvoUkvCv8Hrz0EhZ9TRtLKBPN-g_D9V9s",
  authDomain: "free-cap.firebaseapp.com",
  projectId: "free-cap",
  storageBucket: "free-cap.appspot.com",
  messagingSenderId: "735058447857",
  appId: "1:735058447857:web:fb8ff6944d749874544850",
  measurementId: "G-ZBE2NWH8NY",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
var firebaseUser;
const defaultPassword = 'KBPN-g_D9V9s';
fetchRelaunchPadDataResults = [];
const $root = $('html, body');
const companyNameArray = [
  "company1", "company2", "company3", "company4", "company5", "company6",
  "company7", "company8", "company9", "company10", "company11", "company12",
  "company13", "company14", "company15",
];

function loginWithEmail(email, onError) {
  auth.signInWithEmailAndPassword(email, defaultPassword)
    .then((userCredential) => {
      firebaseUser = userCredential.user;
    })
    .catch((error) => {
      onError();
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
        case 'auth/invalid-password':
          alert('Invalid login details.');
          break;
        case 'auth/network-request-failed':
          alert('Please check network connection.');
          break;
        case 'auth/user-disabled':
          alert('Please contact support.');
          break;
        default:
          alert('Something went wrong.');
      }
    });
}
async function initNotificate() {
  let [
    notificationSnapshot
  ] = await Promise.all([
    db.collection('notification')
      .where('uid', '==', firebaseUser.uid)
      .where('seen', '==', false)
      .orderBy('date_added', 'desc')
      .get()
  ]).catch((e) => { alert('Something went wrong. Please reload the page.'); });
  notificationData = notificationSnapshot.docs.map((e) => {
    return { id: e.id, ...e.data() };
  });

  $(() => {
    initLoadNotificateData();
  });
}
async function initFirebaseData() {
  userSnapshot = await db.doc(`user/${firebaseUser.uid}`).get();
  userData = userSnapshot.data();
  if (!userData || userData.level != 'analyst') {
    auth.signOut();
    $('#loginButton').prop('disabled', false);
    $('.login-button-toggle').toggle();
    return alert('Invalid login details - Not an analyst.');
  }

  let [
    metricSnapshot,
    companySnapshot,
    companyMetricSnapshot,
    notificationSnapshot,
  ] = await Promise.all([
    db.collection('data/app/metric').get(),
    db.collection('data/app/company').get(),
    db.collection('company_metric')
      .where('analystUid', '==', firebaseUser.uid).get(),
    db.collection('notification')
      .where('uid', '==', firebaseUser.uid)
      .where('seen', '==', false)
      .orderBy('date_added', 'desc')
      .get(),
  ]).catch((e) => { alert('Something went wrong. Please reload the page.'); });

  companyMetricMap.clear();
  metricMap.clear();

  companies = companySnapshot.docs.map((e) => {
    return { id: e.id, ...e.data() };
  });
  metricSnapshot.docs.map((e) => {
    metricMap.set(e.id, { id: e.id, ...e.data() });
  });
  companyMetricSnapshot.forEach((e) => {
    companyMetricMap.set(e.id, { id: e.id, ...e.data() });
  });
  notificationData = notificationSnapshot.docs.map((e) => {
    return { id: e.id, ...e.data() };
  });

  $(() => {
    $('#auth-unknown-container').hide();
    $('#auth-success-container').show();
    $('#open-airtable-button').width($('#select-status').outerWidth());

    initLoadedData();
    initTableSortable();
    restoreData();
  });
}

function initTableSortable() {
  data = [];
  companyMetricMap.forEach((e) => {
    data.push({
      company: e.companyName,
      metric: e.metricName,
      id: e.id,
      status: e.status,
      view: '',
    });
  })

  var columns = {
    company: 'COMPANY',
    metric: 'METRIC',
    status: 'STATUS',
    view: '',
  };
  companySearchValue = '';
  companySearchHasFocus = false;

  $('#table-sortable').tableSortable({
    data: data,
    columns: columns,
    rowsPerPage: 10,
    pagination: true,
    sortingIcons: {
      asc: '<i class="fa fa-sort-alpha-asc"></i>',
      desc: '<i class="fa fa-sort-alpha-desc"></i>',
    },
    formatCell: function (row, key) {
      if (key === 'status') {
        bgColor = '';
        switch (row[key]) {
          case 'Assigned':
            bgColor = 'bg-blue';
            break;
          case 'Submitted':
            bgColor = 'bg-purple';
            break;
          case 'Needs Update':
            bgColor = 'bg-orange';
            break;
          case 'Approved':
            bgColor = 'bg-success';
            break;
        }
        return $(
          `<span class="badge ${bgColor} text-white border border-dark">${row[key]}</span>`
        );
      }
      if (key === 'view') {
        return $(`
        <button type="button" class="btn btn-small btn-success view-status-table-view-button rounded-pill px-3 py-1" data-status="${row.status}" data-company-metric-id="${row.id}" id="view-button-${row.id}">View</button>
        `);
      }
      return row[key];
    },
    sorting: ['company'],
    searchField: '#view-status-table-search',
    tableDidUpdate: tableSortableListeners,
  });
  tableSortableListeners();
}

function idFromName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_");
}

function tableSortableListeners() {
  $('.view-status-table-view-button').on('click', function () {
    $this = $(this);
    $root.animate({
      scrollTop: $('#getCompanyData').offset().top
    }, 100);

    tr = $this.closest('tr');
    $('#companyNameInput').val(tr.children().eq(0).text());
    $('#metricNameInput').val(tr.children().eq(1).text()).trigger('input');
    $('#getCompanyData').trigger('click');
    return;
  });
}
function initLoadNotificateData() {
  notifLength = notificationData.length;
  $('#notification-count').text(notifLength);
  for (i = 0; i < notifLength; i++) {
    notif = notificationData[i];
    $('#notificationDropDownMenuContent')
      .append(
        `<li><a class="dropdown-item" data-notif-id="${notif.id}" data-company-metric-id="${notif.company_metric_id}" href="#">${notif.message}</a></li>`
      );
  }
  if (notifLength > 0) {
    $('#notificationDropDownMenuContent li a').on('click', function () {
      $this = $(this);
      notifLength -= 1;
      id = $this.attr('data-company-metric-id');
      notifId = $this.attr('data-notif-id');
      db.doc(`notification/${notifId}`).update({ seen: true });
      $('#notification-count').text(notifLength);
      $this.remove();
      $(`#view-button-${id}`).trigger('click');

      if (notifLength == 0) {
        $('#notificationDropDownMenuContent')
          .append(
            `<li><a class="dropdown-item" href="#">No Notifications.</a></li>`
          );
        $('#notification-count').hide();
      }
    })
  } else {
    $('#notificationDropDownMenuContent')
      .append(
        `<li><a class="dropdown-item" href="#">No Notifications.</a></li>`
      );
    $('#notification-count').hide();
  }
}
function initLoadedData() {
  for (i = 0; i < companies.length; i++) {
    $('#companyNameOptions')
      .append(`<option value="${companies[i].company1}"></option>`)
  }

  metricKeys = Array.from(metricMap.keys());
  for (i = 0; i < metricKeys.length; i++) {
    metric = metricMap.get(metricKeys[i]);
    $('#metricListOptions')
      .append(
        `<option value="${metric.metric}" data-id="${metric.id}"></option>`
      );
  }

  searched = searchDataParams.searched;
  $('#metricNameInput').trigger('input');
  searchDataParams.searched = searched;

  notifLength = notificationData.length;
  $('#notification-count').text(notifLength);
  for (i = 0; i < notifLength; i++) {
    notif = notificationData[i];
    $('#notificationDropDownMenuContent')
      .append(
        `<li><a class="dropdown-item" data-notif-id="${notif.id}" data-company-metric-id="${notif.company_metric_id}" href="#">${notif.message}</a></li>`
      );
  }
  if (notifLength > 0) {
    $('#notificationDropDownMenuContent li a').on('click', function () {
      $this = $(this);
      notifLength -= 1;
      id = $this.attr('data-company-metric-id');
      notifId = $this.attr('data-notif-id');
      db.doc(`notification/${notifId}`).update({ seen: true });
      $('#notification-count').text(notifLength);
      $this.remove();
      $(`#view-button-${id}`).trigger('click');

      if (notifLength == 0) {
        $('#notificationDropDownMenuContent')
          .append(
            `<li><a class="dropdown-item" href="#">No Notifications.</a></li>`
          );
        $('#notification-count').hide();
      }
    })
  } else {
    $('#notificationDropDownMenuContent')
      .append(
        `<li><a class="dropdown-item" href="#">No Notifications.</a></li>`
      );
    $('#notification-count').hide();
  }

  $('#logout').on('click', () => {
    auth.signOut();

    $('#loginButton').prop('disabled', false);
    $('#login-button-toggle-text').show();
    $('#login-button-toggle-spinner').hide();
  });
}

function setDocumentData(data) {
  $('#companyNameInput').val(data.companyName);
  $('#metricNameInput').val(data.metricName).trigger('input');
  $('#companyTypeInput').val(data.companyType);
  $('#averageRating').val(data.averageRating);
  $('#averageBenefitRating').val(data.averageBenefitRating);
  $('#companySize').val(data.companySize);
  $('#industryInput').val(data.industry);
  $('#reviewCount').val(data.reviewCount);
  $('#companyHomePage').val(data.companyHomePage);
  if (data.companyHomePage)
    $('#companyHomePageHref').attr('href', data.companyHomePage);
  if (data.glassdoorHomePage)
    $('#openGlassdoorButton').attr('href', data.glassdoorHomePage);
  $('#careerPage').val(data.careerPage);
  if (data.careerPage)
    $('#careerPageHref').attr('href', data.careerPage);
  $('#aboutUsPage').val(data.aboutUsPage);
  if (data.aboutUsPage)
    $('#aboutUsPageHref').attr('href', data.aboutUsPage);
  $('#csrPage').val(data.csrPage);
  if (data.csrPage) $('#csrPageHref').attr('href', data.csrPage);

  if (data.companyLinks0) {
    $('#companyLinks0').val(data.companyLinks0);
    $('#companyLinks0Href').attr('href', data.companyLinks0);
    $('#company-links-indicator0').addClass(data.companyLinksIndicator0 ?? '').attr('data-color', data.companyLinksIndicator0);
  }
  if (data.companyLinks1) {
    $('#companyLinks1').val(data.companyLinks1);
    $('#companyLinks1Href').attr('href', data.companyLinks1);
    $('#company-links-indicator1').addClass(data.companyLinksIndicator1 ?? '').attr('data-color', data.companyLinksIndicator1);
  }
  if (data.companyLinks2) {
    $('#companyLinks2').val(data.companyLinks2);
    $('#companyLinks2Href').attr('href', data.companyLinks2);
    $('#company-links-indicator2').addClass(data.companyLinksIndicator2 ?? '').attr('data-color', data.companyLinksIndicator2);
  }
  if (data.companyLinks3) {
    $('#companyLinks3').val(data.companyLinks3);
    $('#companyLinks3Href').attr('href', data.companyLinks3);
    $('#company-links-indicator3').addClass(data.companyLinksIndicator3 ?? '').attr('data-color', data.companyLinksIndicator3);
  }
  if (data.companyLinks4) {
    $('#companyLinks4').val(data.companyLinks4);
    $('#companyLinks4Href').attr('href', data.companyLinks4);
    $('#company-links-indicator4').addClass(data.companyLinksIndicator4 ?? '').attr('data-color', data.companyLinksIndicator4);
  }
  if (data.companyLinks5) {
    $('#companyLinks5').val(data.companyLinks5);
    $('#companyLinks5Href').attr('href', data.companyLinks5);
    $('#company-links-indicator5').addClass(data.companyLinksIndicator5 ?? '').attr('data-color', data.companyLinksIndicator5);
  }
  if (data.companyLinks6) {
    $('#companyLinks6').val(data.companyLinks6);
    $('#companyLinks6Href').attr('href', data.companyLinks6);
    $('#company-links-indicator6').addClass(data.companyLinksIndicator6 ?? '').attr('data-color', data.companyLinksIndicator6);
  }
  if (data.companyLinks7) {
    $('#companyLinks7').val(data.companyLinks7);
    $('#companyLinks7Href').attr('href', data.companyLinks7);
    $('#company-links-indicator7').addClass(data.companyLinksIndicator7 ?? '').attr('data-color', data.companyLinksIndicator7);
  }
  if (data.companyLinks8) {
    $('#companyLinks8').val(data.companyLinks8);
    $('#companyLinks8Href').attr('href', data.companyLinks8);
    $('#company-links-indicator8').addClass(data.companyLinksIndicator8 ?? '').attr('data-color', data.companyLinksIndicator8);
  }
  if (data.companyLinks9) {
    $('#companyLinks9').val(data.companyLinks9);
    $('#companyLinks9Href').attr('href', data.companyLinks9);
    $('#company-links-indicator9').addClass(data.companyLinksIndicator9 ?? '').attr('data-color', data.companyLinksIndicator9);
  }

  if (data.metricScoring)
    $(`input[name=metric-scoring-option][value=${data.metricScoring}]`)
      .prop('checked', true);

  relaunchNotAvailable = $('#relaunchNotAvailable');
  relaunchNotAvailable.hide();
  if (data.relaunchPadVerification == 'HIGH CHANCE') {
    relaunchNotAvailable.attr('data-value', 'HIGH CHANCE');
    $('#rlpHC').show();
  } else if (data.relaunchPadVerification == 'AVERAGE CHANCE') {
    relaunchNotAvailable.attr('data-value', 'AVERAGE CHANCE');
    $('#rlpAC').show();
  } else if (data.relaunchPadVerification == 'LOW CHANCE') {
    relaunchNotAvailable.attr('data-value', 'LOW CHANCE');
    $('#rlpLC').show();
  } else if (data.relaunchPadVerification == 'NOT LISTED') {
    relaunchNotAvailable.attr('data-value', 'NOT LISTED');
    $('#rlpNL').show();
  } else {
    relaunchNotAvailable.attr('data-value', 'NOT AVAILABLE');
    relaunchNotAvailable.show();
  }

  scbcNotAvailable = $('#scbcNotAvailable');
  scbcNotAvailable.hide();
  if (data.scbcVerification == 'LISTED') {
    scbcNotAvailable.attr('data-value', 'LISTED');
    $('#scbcListed').show();
  } else if (data.scbcVerification == 'NOT LISTED') {
    scbcNotAvailable.attr('data-value', 'NOT LISTED');
    $('#scbcNotListed').show();
  } else {
    scbcNotAvailable.attr('data-value', 'NOT AVAILABLE');
    scbcNotAvailable.show();
  }

  prisonNotAvailable = $('#prisonNotAvailable');
  prisonNotAvailable.hide();
  if (data.prisonsVerification == 'LISTED') {
    prisonNotAvailable.attr('data-value', 'LISTED');
    $('#prisonListed').show();
  } else if (data.prisonsVerification == 'NOT LISTED') {
    prisonNotAvailable.attr('data-value', 'NOT LISTED');
    $('#prisonNotListed').show();
  } else {
    prisonNotAvailable.attr('data-value', 'NOT AVAILABLE');
    prisonNotAvailable.hide();
  }

  for (i = 0; i < data.comments?.length ?? 0; i++) {
    $('#comment-container').append(
      `<div class="alert alert-secondary comment-data" data-type="old">
        ${data.comments[i]}
      </div>`
    );
  }

  for (i = 0; i < data.otherLinks?.length ?? 0; i++) {
    otherLink = data.otherLinks[i];
    $('#companyLinksTable tbody').append(
      `<tr class="align-baseline">
        <th scope="row">
          <label for="otherLinks${i}" class="col-form-label">
            ${otherLink.label}:
          </label>
        </th>
        <td>
          <input type="text" id="otherLinks${i}" class="form-control 
          another-link-input" value="${otherLink.url}">
        </td>
        <td style="width: 1rem;">
          <a class="fa fa-external-link text-decoration-none" target="_blank" href="${otherLink.url}"
          </a>
        </td>
      </tr>`
    );
  }
}

function submitData() {
  otherLinks = [];
  $('.another-link-input').each(function (i, obj) {
    $this = $(this);
    label = $this.closest('tr').find('label').text().trim();
    otherLinks.push({ label, url: $this.val().trim() });
  });

  data = {
    companyName: $('#companyNameInput').val().trim(),
    companyId: searchDataParams.companyId,
    metricName: $('#metricNameInput').val().trim(),
    metricId: searchDataParams.metricId,
    status: 'Submitted',
    companyType: $('#companyTypeInput').val().trim(),
    averageRating: $('#averageRating').val().trim(),
    averageBenefitRating: $('#averageBenefitRating').val().trim(),
    companySize: $('#companySize').val().trim(),
    industry: $('#industryInput').val().trim(),
    reviewCount: $('#reviewCount').val().trim(),
    glassdoorHomePage: $('#openGlassdoorButton').attr('href')?.trim() ?? '',
    companyHomePage: $('#companyHomePage').val().trim(),
    careerPage: $('#careerPage').val().trim(),
    aboutUsPage: $('#aboutUsPage').val().trim(),
    csrPage: $('#csrPage').val().trim(),
    otherLinks: otherLinks,
    companyLinks0: $('#companyLinks0').val().trim(),
    companyLinks1: $('#companyLinks1').val().trim(),
    companyLinks2: $('#companyLinks2').val().trim(),
    companyLinks3: $('#companyLinks3').val().trim(),
    companyLinks4: $('#companyLinks4').val().trim(),
    companyLinks5: $('#companyLinks5').val().trim(),
    companyLinks6: $('#companyLinks6').val().trim(),
    companyLinks7: $('#companyLinks7').val().trim(),
    companyLinks8: $('#companyLinks8').val().trim(),
    companyLinks9: $('#companyLinks9').val().trim(),
    companyLinksIndicator0:
      $('#company-links-indicator0').attr('data-color') ?? '',
    companyLinksIndicator1:
      $('#company-links-indicator1').attr('data-color') ?? '',
    companyLinksIndicator2:
      $('#company-links-indicator2').attr('data-color') ?? '',
    companyLinksIndicator3:
      $('#company-links-indicator3').attr('data-color') ?? '',
    companyLinksIndicator4:
      $('#company-links-indicator4').attr('data-color') ?? '',
    companyLinksIndicator5:
      $('#company-links-indicator5').attr('data-color') ?? '',
    companyLinksIndicator6:
      $('#company-links-indicator6').attr('data-color') ?? '',
    companyLinksIndicator7:
      $('#company-links-indicator7').attr('data-color') ?? '',
    companyLinksIndicator8:
      $('#company-links-indicator8').attr('data-color') ?? '',
    companyLinksIndicator9:
      $('#company-links-indicator9').attr('data-color') ?? '',
    metricScoring: $('input[type=radio][name=metric-scoring-option]:checked')
      .val().trim(),
    analystUid: firebaseUser.uid,
    relaunchPadVerification: $('#relaunchNotAvailable').attr('data-value'),
    scbcVerification: $('#scbcNotAvailable').attr('data-value'),
    prisonsVerification: $('#prisonNotAvailable').attr('data-value'),
  }

  companyMetricId = searchDataParams.companyMetricId;
  console.log(data, "save into company_metric");
  db.doc(`company_metric/${companyMetricId}`).set(data, { merge: true })
    .then(() => {
      $('.comment-data').each(function (i, obj) {
        comments = firebase.firestore.FieldValue.arrayUnion($(this).text().trim());
        db.doc(`company_metric/${companyMetricId}`)
          .set({ comments }, { merge: true });
      });
      $('#submit-data').prop('disabled', false);
      $('.submit-data-button-loading-toggle').toggle();
      clearAllData();
      alert('Data submitted successfully');
    })
    .catch((_) => {
      alert('Unable to search company and metric data.');
      $('#submit-data').prop('disabled', false);
      $('.submit-data-button-loading-toggle').toggle();
    });
}

function saveintoFirebase() {
  console.log("saveintofirebase");
  otherLinks = [];
  $('.another-link-input').each(function (i, obj) {
    $this = $(this);
    label = $this.closest('tr').find('label').text().trim();
    otherLinks.push({ label, url: $this.val().trim() });
  });

  data = {
    companyName: $('#companyNameInput').val().trim(),
    companyId: searchDataParams.companyId,
    metricName: $('#metricNameInput').val().trim(),
    metricId: searchDataParams.metricId,
    status: '',
    companyType: $('#companyTypeInput').val().trim(),
    averageRating: $('#averageRating').val().trim(),
    averageBenefitRating: $('#averageBenefitRating').val().trim(),
    companySize: $('#companySize').val().trim(),
    industry: $('#industryInput').val().trim(),
    reviewCount: $('#reviewCount').val().trim(),
    glassdoorHomePage: $('#openGlassdoorButton').attr('href')?.trim() ?? '',
    companyHomePage: $('#companyHomePage').val().trim(),
    careerPage: $('#careerPage').val().trim(),
    aboutUsPage: $('#aboutUsPage').val().trim(),
    csrPage: $('#csrPage').val().trim(),
    otherLinks: otherLinks,
    companyLinks0: $('#companyLinks0').val().trim(),
    companyLinks1: $('#companyLinks1').val().trim(),
    companyLinks2: $('#companyLinks2').val().trim(),
    companyLinks3: $('#companyLinks3').val().trim(),
    companyLinks4: $('#companyLinks4').val().trim(),
    companyLinks5: $('#companyLinks5').val().trim(),
    companyLinks6: $('#companyLinks6').val().trim(),
    companyLinks7: $('#companyLinks7').val().trim(),
    companyLinks8: $('#companyLinks8').val().trim(),
    companyLinks9: $('#companyLinks9').val().trim(),
    companyLinksIndicator0:
      $('#company-links-indicator0').attr('data-color') ?? '',
    companyLinksIndicator1:
      $('#company-links-indicator1').attr('data-color') ?? '',
    companyLinksIndicator2:
      $('#company-links-indicator2').attr('data-color') ?? '',
    companyLinksIndicator3:
      $('#company-links-indicator3').attr('data-color') ?? '',
    companyLinksIndicator4:
      $('#company-links-indicator4').attr('data-color') ?? '',
    companyLinksIndicator5:
      $('#company-links-indicator5').attr('data-color') ?? '',
    companyLinksIndicator6:
      $('#company-links-indicator6').attr('data-color') ?? '',
    companyLinksIndicator7:
      $('#company-links-indicator7').attr('data-color') ?? '',
    companyLinksIndicator8:
      $('#company-links-indicator8').attr('data-color') ?? '',
    companyLinksIndicator9:
      $('#company-links-indicator9').attr('data-color') ?? '',
    metricScoring: $('input[type=radio][name=metric-scoring-option]:checked')
      .val().trim(),
    analystUid: "",
    // analystUid: firebaseUser.uid,
    relaunchPadVerification: $('#relaunchNotAvailable').attr('data-value'),
    scbcVerification: $('#scbcNotAvailable').attr('data-value'),
    prisonsVerification: $('#prisonNotAvailable').attr('data-value'),
  }

  companyMetricId = searchDataParams.companyMetricId;
  console.log(data, "save into company_metric firebase");
  db.doc(`company_metric/${companyMetricId}`).set(data, { merge: true })
    .then(() => {
      $('.comment-data').each(function (i, obj) {
        comments = firebase.firestore.FieldValue.arrayUnion($(this).text().trim());
        db.doc(`company_metric/${companyMetricId}`)
          .set({ comments }, { merge: true });
      });
    })
    .catch((_) => {

    });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    firebaseUser = user;
    initFirebaseData();
  } else {
    firebaseUser = null;
    $('#auth-loading-container').hide();
    $('#auth-unknown-container').show();
    $('#auth-failure-container').show();
    $('#auth-success-container').hide();
  }
});

$(function () {
  $('#loginButton').on('click', function () {
    email = $('#loginEmailInput').val();
    if (email == '') {
      alert('Please enter your email');
      return;
    }
    $(this).prop('disabled', true);
    $('.login-button-toggle').toggle();

    loginWithEmail(
      email,
      () => {
        $(this).prop('disabled', false);
        $('.login-button-toggle').toggle();
      },
    );
  });

  $('#submit-data').on('click', function () {
    $(this).prop('disabled', true);
    $('.submit-data-button-loading-toggle').toggle();
    if (!searchDataParams.searched) {
      alert('Company and metric data has not been searched');
      $(this).prop('disabled', false);
      $('.submit-data-button-loading-toggle').toggle();
      return;
    }

    submitData();
  });

  $('.toggle-comment:not(textarea)').on('click', () => {
    $('.toggle-comment').toggle();
  });

  $('#submit-comment').on('click', () => {
    value = $('textarea.toggle-comment').val();
    if (!value) {
      alert('Please add a comment');
      return;
    }
    $('#comment-container').append(
      `<div class="alert alert-secondary comment-data" data-type="new">
        ${value}
      </div>`
    );

    comments = [];
    $('.comment-data').each(function (i, obj) {
      comments.push($(this).text().trim());
    });
    saveData({ comments });
  });

  $('#companyNameInput').on('input', function () {
    searchDataParams.companyName = $(this).val();
    saveData({ company: searchDataParams.companyName });
    searchDataParams.searched = false;
    saveData({ searchDataParams: searchDataParams });
  });

  $('#metricNameInput').on('input', metricInputTrigger);

  $('.dropdownOptions').on('click', function () {
    $(this).parent().prev().text($(this).text());
  });

  $('#add-another-link-button').on('click', function () {
    $('#add-another-link').addClass('d-none')
    $('#add-another-link-form').removeClass('d-none')
  })

  $('#add-another-link-form-cancel-button').on('click', function () {
    saveData({ tempOtherLinksLabel: '' });
    saveData({ tempOtherLinksUrl: '' });
    $('#add-another-link-form').addClass('d-none')
    $('#add-another-link').removeClass('d-none')
  })

  $('#add-another-link-form-button').on('click', () => {
    label = $('#add-another-link-form-url-label').val();
    url = $('#add-another-link-form-url').val();

    if (!label) return alert('Please add label');
    if (!url) return alert('Please add url');

    $('#add-another-link-form').addClass('d-none');
    $('#add-another-link').removeClass('d-none');

    length = $('.another-link-input').length;
    $('#companyLinksTable tbody').append(
      `<tr class="align-baseline">
        <th scope="row">
          <label for="otherLinks${length}" class="col-form-label">
            ${label}:
          </label>
        </th>
        <td>
          <input type="text" id="otherLinks${length}" class="form-control 
          another-link-input" value="${url}">
        </td>
        <td style="width: 1rem;">
          <a class="fa fa-external-link text-decoration-none" target="_blank" href="${url}"
          </a>
        </td>
      </tr>`
    );
    $(`#otherLinks${length}`).on('keyup', function () {
      otherLinks = [];
      $('.another-link-input').each(function (i, obj) {
        $this = $(this);
        label = $this.closest('tr').find('label').text().trim().slice(0, -1);
        otherLinks.push({ label, url: $this.val().trim() });
      });
      saveData({ 'otherLinks': otherLinks });
    }).trigger('keyup');

    saveData({ tempOtherLinksLabel: '' });
    saveData({ tempOtherLinksUrl: '' });
    $('#add-another-link-form-url-label').val('');
    $('#add-another-link-form-url').val('');
  })

  $('#getCompanyData').on('click', function () {
    $this = $(this);
    searchDataParams.companyName = $('#companyNameInput').val();
    if (!searchDataParams.companyName) {
      alert('Please select a company');
      return;
    }
    if (!searchDataParams.metricId) {
      alert('Please select a metric');
      return;
    }
    company = companies.find((e) => e.company1 == searchDataParams.companyName);
    if (!company) {
      alert('Invalid company. Please check your spelling or select company from dropdown');
      return;
    }

    clearAllData();

    saveData({ status: $('#selectStatus').val() });
    saveData({ companyName: searchDataParams.companyName });
    saveData({ metricName: searchDataParams.metricName });
    searchDataParams.searched = true;
    searchDataParams.companyId = company.id;
    searchDataParams.companyMetricId = searchDataParams.companyId + searchDataParams.metricId;
    saveData({ searchDataParams: searchDataParams });

    $('.get-company-data-loading-toggle').toggle();
    $this.prop('disabled', true);

    var notifId = $("[data-company-metric-id=" + searchDataParams.companyId + searchDataParams.metricId + "]").attr("data-notif-id");
    db.doc(`notification/${notifId}`).update({ seen: true });
    // $("[data-company-metric-id=" + searchDataParams.companyId + searchDataParams.metricId + "]").remove();
    $('#notificationDropDownMenuContent').html("");
    console.log("init");
    // initFirebaseData();
    initNotificate();
    db.doc(`company_metric/${searchDataParams.companyMetricId}`).get()
      .then((doc) => {
        data = doc.data();
        console.log(data);
        if (data && data.status != 'Assigned') {
          setDocumentData(data);

          searchDataParams = {
            metricName: data.metricName,
            metricId: data.metricId,
            companyName: data.companyName,
            companyId: data.companyId,
            companyMetricId: searchDataParams.companyMetricId,
            analystUid: data.analystUid,
            searched: true,
          }

          $('#select-status').val(data.status).trigger('change');
          $('.get-company-data-loading-toggle').toggle();
          $('#getCompanyData').prop('disabled', false);
        } else {
          console.log("fetchGoogle");
          $('#select-status').val(data?.status ?? 'Not Assigned').trigger('change');
          companyNames = [];
          for (let i = 0; i < companyNameArray.length; i++) {
            const name = company[companyNameArray[i]];
            if (name) companyNames.push(name);
          }
          console.log(companyNames);
          fetchGoogleData();
          fetchSCBCData(companyNames);
          fetchPrisonData(companyNames);
          initRelaunchPadData(companyNames);
        }
      })
      .catch((_) => {
        alert('Something went wrong.');

        $('.get-company-data-loading-toggle').toggle();
        $('#getCompanyData').prop('disabled', false);
      });
  });

  $('.save-input').on('keyup', function () {
    $this = $(this);
    var data = {};
    id = $this.attr('data-id');
    if (!id) id = $this.attr('id');
    data[id] = $this.val();
    saveData(data);
  });

  $('.save-select').on('change', function () {
    $this = $(this);
    var data = {};
    data[$this.attr('id')] = $this.val();
    saveData(data);
  });

  $('#select-status').on('change', function () {
    $this = $(this);

    bgColor = 'bg-blue';
    textColor = 'text-white';
    switch (this.value) {
      case 'Submitted':
        bgColor = 'bg-purple';
        textColor = 'text-white';
        break;
      case 'Needs Update':
        bgColor = 'bg-orange';
        textColor = 'text-white';
        break;
      case 'Approved':
        bgColor = 'bg-success';
        textColor = 'text-white';
        break;
      case 'Not Assigned':
        bgColor = 'c-bg-yellow';
        textColor = 'text-black';
        break;
    }
    $this.removeClass('bg-blue').removeClass('text-white').removeClass('c-bg-yellow').removeClass('bg-purple').removeClass('bg-white').removeClass('text-black').addClass(bgColor).addClass(textColor);
  });
});

function metricInputTrigger() {
  searchDataParams.metricId = '';
  searchDataParams.searched = false;
  var $this = $('#metricNameInput');
  val = $this.val();
  saveData({ metric: val });

  list = $this.attr('list');
  $('#metricOptionDefinition').text('Select a metric');
  $('#metricScoringDefinition').text('Select a metric');
  $('#select-metric-option').empty();
  $('#metric-score-option-title').empty();
  $('#' + list + ' option').filter(function () {
    if ($(this).val() === val) {
      searchDataParams.metricId = $(this).attr('data-id');
      def = metricMap.get(searchDataParams.metricId).definition;
      searchDataParams.metricName = metricMap.get(searchDataParams.metricId).metric;
      saveData({ searchDataParams: searchDataParams });

      $('#metricOptionDefinition').text(def);
      $('#metricScoringDefinition').text(val);
      updateMetricScore();
    }
  });
}

function updateMetricScore() {
  metricScores = metricMap.get(searchDataParams.metricId).metricScores;
  for (i = 0; i < metricScores.length; i++) {
    $('#select-metric-option').append(
      `<input type="radio" class="btn-check" name="metric-scoring-option" id="metric-scoring-${i}" autocomplete="off" ${i == 0 ? 'checked' : ''} value="${i}" title="${metricScores[i]}">
      <label class="btn btn-outline-pink shadow w-auto mx-2 py-3 px-4" for="metric-scoring-${i}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${metricScores[i]}">
        <span class="fs-2">${i}</span>
        <div class="position-absolute">
          <small class="fa fa-check-circle position-absolute text-purple show-if-checked" style="left: 20px;top: -58px;"></small>
          <small class="fa fa-info-circle text-orange position-absolute" style="left: 20px;"></small>
        </div>
      </label>`
    );
  }
  $('input[type=radio][name=metric-scoring-option]').on('change', function () {
    var data = {};
    data['metricScoring'] = $(this).val();
    saveData(data);
    updateMetricScoreTitle($(this).attr('title'));
  });
  updateMetricScoreTitle(metricScores[0]);
}

function updateMetricScoreTitle(title) {
  $('#metric-score-option-title').text(title);
}

function clearAllData() {
  $('#companyHomePage').val('');
  $('#companyHomePageHref').removeAttr('href');
  $('#openGlassdoorButton').removeAttr('href');
  for (i = 0; i < 10; i++) {
    $('#companyLinks' + i).val('');
    $('#companyLinks' + i + 'Href').removeAttr('href');
    $('#company-links-indicator' + i).removeClass('bg-primary').removeClass('bg-yellow').removeClass('bg-orange').removeClass('bg-danger').attr('data-color', '');
  }
  $('#careerPage').val('');
  $('#careerPageHref').removeAttr('href');
  $('#aboutUsPage').val('');
  $('#aboutUsPageHref').removeAttr('href');
  $('#csrPage').val('');
  $('#csrPageHref').removeAttr('href');
  $('#companyTypeInput').val('');
  $('#companySize').val('');
  $('#industryInput').val('');
  $('#reviewCount').val('');
  $('#averageRating').val('');
  $('#averageBenefitRating').val('');
  $('#comment-container').empty();
  $('.another-link-input').each(function (i, obj) {
    $(this).closest('tr').remove();
  });
  $('.save-input:not(#companyNameInput,#metricNameInput)').val('');
  $('#rlpHC').hide();
  $('#rlpAC').hide();
  $('#rlpLC').hide();
  $('#rlpNL').hide();
  $('#relaunchNotAvailable').text('--').show()
    .attr('data-value', 'NOT AVAILABLE');

  $('#scbcListed').hide();
  $('#scbcNotListed').hide();
  $('#scbcNotAvailable').text('--').show().attr('data-value', 'NOT AVAILABLE');;

  $('#prisonNotListed').hide();
  $('#prisonListed').hide();
  $('#prisonNotAvailable').text('--').show()
    .attr('data-value', 'NOT AVAILABLE');

  chrome.storage.sync.clear();
}

function fetchGoogleData() {
  companyName = searchDataParams.companyName;
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'google', keyword: 'glassdoor+' + companyName + '+"overview"' },
    text => parseGoogle(text));
  chrome.runtime.sendMessage(
    {
      contentScriptQuery: 'google',
      keyword: 'glassdoor+' + companyName + '+"reviews"',
    },
    text => parseGoogle(text, 'reviews'));
  chrome.runtime.sendMessage(
    {
      contentScriptQuery: 'google',
      keyword: 'glassdoor+' + companyName + '+"benefit"+united+states',
    },
    text => parseGoogle(text, 'benefits'));

  chrome.runtime.sendMessage(
    { contentScriptQuery: 'google', keyword: companyName + '+website' },
    text => parseCompanyPage(text));
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'google', keyword: companyName + '+careers' },
    text => parseCompanyPage(text, 'careers'));
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'google', keyword: companyName + '+aboutus' },
    text => parseCompanyPage(text, 'aboutus'));
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'google', keyword: companyName + '+csr' },
    text => parseCompanyPage(text, 'csr'));
  keyword = metricMap.get(searchDataParams.metricId).keywords[0] ?? '';
  setTimeout(function () {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: 'google',
        keyword: '"' + companyName + '"+' + keyword
      },
      text => top10Links(text));
    console.log(data.status, "fetchGoogleDta");
    if (data.status!="Assigned") {
      setTimeout(function () {
        console.log($('#companyLinks0').val().trim());
        setTimeout(function () {
          $("#companyNameInput").val(searchDataParams.companyName);
          $("#metricNameInput").val(searchDataParams.metricName);
        }, 1500);
        setTimeout(function () {
          if ($('#companyLinks0').val()) {
            saveintoFirebase();
            windowStatus = true;
          } else {
            maxAgainNum++;
            console.log(maxAgainNum);
            if (maxAgainNum < 4) {
              $('#getCompanyData').click();
            } else {
              maxAgainNum = 0;
            }
          }
          setTimeout(function () {
            if ($('#companyLinks0').val()) {
              saveintoFirebase();
            }
          }, 8000);
        }, 1000);
      }, 2000);
    }
  }, 500);
}

function parseCompanyPage(text, page = 'homepage') {
  start = text.indexOf('data-async-context="query');
  start = text.indexOf('<a href="', start);

  start = start + 9;
  end = text.indexOf('"', start);
  href = text.substring(start, end);
  if (page == 'homepage') {
    cleanHref = cleanData(href);
    $('#companyHomePage').val(cleanHref).trigger('keyup');
    if (cleanHref != 'Not Available') {
      $('#companyHomePageHref').attr('href', cleanHref);
    }
  }
  if (page == 'careers') {
    cleanHref = cleanData(href);
    $('#careerPage').val(cleanHref).trigger('keyup');
    if (cleanHref != 'Not Available') {
      $('#careerPageHref').attr('href', cleanHref);
    }
  }
  if (page == 'aboutus') {
    cleanHref = cleanData(href);
    $('#aboutUsPage').val(cleanHref).trigger('keyup');
    if (cleanHref != 'Not Available') {
      $('#aboutUsPageHref').attr('href', cleanHref);
    }

    $('.get-company-data-loading-toggle').toggle();
    $('#getCompanyData').prop('disabled', false);
  }
  if (page == 'csr') {
    cleanHref = cleanData(href);
    $('#csrPage').val(cleanHref);
    if (cleanHref != 'Not Available') {
      $('#csrPageHref').attr('href', cleanHref);
    }
  }
}

async function top10Links(text) {
  var doc = document.createElement("html");
  doc.innerHTML = text;
  var links = doc.getElementsByTagName("a");
  var res = text.replace(/\n/g, "");
  let result = /.*?<title>(.*?)<\/title>/.exec(res);
  console.log(result,"bot check");
  if (result[1][0] == "h" && result[1][1] == "t" && result[1][2] == "t" && result[1][3] == "p" && windowStatus == true) {
    var myWindow = window.open(result[1], "MsgWindow", "width=800,height=800");
    windowStatus = false;
  }
  const linksMap = new Map();
  for (i = 0; i < links.length; i++) {
    let link = links[i].getAttribute("href");
    if (link == null) continue;
    absoluteLink = link.substring(0, 5).toLowerCase() == 'https';
    googleLink = link.includes('google.com');
    if (!absoluteLink || googleLink || link in linksMap) continue;

    linksMap.set(link, 0);
  }

  linkMapKeys = Array.from(linksMap.keys());
  const promises = [];
  for (let i = 0; i < linksMap.size; i++) {
    promises.push(checkForRelevance(linkMapKeys[i]));
  }
  const countArr = await Promise.all(promises);
  countArr.forEach((count) => linksMap.set(linkMapKeys[i], count));
  // myWindow.document.write(text);
  implementTopLinksDom(linksMap);
}

function checkForRelevance(link) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { contentScriptQuery: 'general', link },
      data => {
        data = data?.toLowerCase() ?? '';
        keywords = metricMap.get(searchDataParams.metricId).keywords;
        count = 0;
        for (i = 0; i < keywords.length; i++) {
          count += occurrences(data, keywords[i].toLowerCase());
        }
        return resolve(count);
      });
  }).catch(e => resolve(0));
}

function implementTopLinksDom(linksMap) {
  const sortedLinks =
    new Map([...linksMap.entries()].sort((a, b) => b[1] - a[1]));
  sortedLinksKeys = Array.from(sortedLinks.keys());
  sortedLinksValues = Array.from(sortedLinks.values());
  maxCount = sortedLinksValues[0];
  oneTenth = maxCount * 1 / 10;
  oneFifth = maxCount * 1 / 5;
  half = maxCount * 1 / 2;
  for (i = 0; i < 10 && i < sortedLinks.size; i++) {
    $('#companyLinks' + i).val(sortedLinksKeys[i]).trigger('keyup');
    $('#companyLinks' + i + 'Href').attr('href', sortedLinksKeys[i]);
    color = 'bg-danger';
    switch (true) {
      case sortedLinksValues[i] > half:
        color = 'bg-primary';
        break;
      case sortedLinksValues[i] > oneFifth:
        color = 'bg-yellow';
        break;
      case sortedLinksValues[i] > oneTenth:
        color = 'bg-orange';
        break;
    }
    data = {};
    data[`companyLinksIndicator${i}`] = color;
    $('#company-links-indicator' + i).addClass(color).attr('data-color', color);
    saveData({ data });
  }
}

function occurrences(string, subString, allowOverlapping) {
  string += '';
  subString += '';
  if (subString.length <= 0) return (string.length + 1);
  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

function cleanData(text) {
  if (text.includes('DOCTYPE')) return 'Not Available';
  return text;
}

function parseGoogle(text, page = 'overview') {
  var doc = document.createElement("html");
  doc.innerHTML = text;
  var links = doc.getElementsByTagName("a");

  for (var i = 0; i < links.length; i++) {
    let link = links[i].getAttribute("href");
    if (link == null) continue;
    linkExt = link.substring(0, 26 + page.length).toLowerCase();
    if (linkExt == 'https://www.glassdoor.com/' + page) {
      if (page == 'overview') {
        saveData({ glassdoorHomePage: link });
        $('#openGlassdoorButton').attr('href', link);
      }
      fetchGlassdoorData(link.substring(26), page)
      break;
    }
  }
}

function fetchGlassdoorData(link, page) {
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'glassdoor', link: link },
    text => {
      if (page == 'overview') return parseGlassdoorData(text);
      if (page == 'reviews') return parseGlassdoorReviewData(text);
      return parseGlassdoorBenefitData(text);
    });
}

function initRelaunchPadData(companyNames) {
  $('#relaunchNotAvailable').text('LOADING')
    .attr('data-value', 'NOT AVAILABLE');

  fetchRelaunchPadDataResults = [];
  for (i = 0; i < companyNames.length; i++) {
    fetchRelaunchPadData(companyNames, i);
  };
}

function fetchRelaunchPadData(companyNames, i) {
  chrome.runtime.sendMessage({
    contentScriptQuery: 'relaunch',
    link: 'https://therelaunchpad.com/wp-json/relaunch-pad/companies',
    name: companyNames[i],
  },
    text => {
      fetchRelaunchPadDataResults.push(text.data.companies);
      if (fetchRelaunchPadDataResults.length == companyNames.length)
        processRelaunchPadData();
    });
}

function processRelaunchPadData() {
  rlpLC = rlpAC = rlpHC = false;
  for (i = 0; i < fetchRelaunchPadDataResults.length; i++) {
    company = fetchRelaunchPadDataResults[i][0];
    if (!company || company == {}) continue;

    if (company.likelihood == 3) rlpLC = true;
    if (company.likelihood == 2) rlpAC = true;
    if (company.likelihood == 1) rlpHC = true;
  };

  $('#relaunchNotAvailable').hide();
  if (rlpLC || rlpAC || rlpHC) $('#rlpNL').hide();
  if (rlpHC) {
    saveData({ relaunchPadVerification: 'HIGH CHANCE' });
    $('#relaunchNotAvailable').attr('data-value', 'HIGH CHANCE');
    $('#rlpHC').show();
    return;
  }
  if (rlpAC) {
    saveData({ relaunchPadVerification: 'AVERAGE CHANCE' });
    $('#relaunchNotAvailable').attr('data-value', 'AVERAGE CHANCE');
    $('#rlpAC').show();
    return;
  }
  if (rlpLC) {
    saveData({ relaunchPadVerification: 'LOW CHANCE' });
    $('#relaunchNotAvailable').attr('data-value', 'LOW CHANCE');
    $('#rlpLC').show();
    return;
  }
  $('#rlpNL').show();
  $('#relaunchNotAvailable').attr('data-value', 'NOT LISTED');
  saveData({ relaunchPadVerification: 'NOT LISTED' });
}

function fetchSCBCData(companyNames) {
  $('#scbcNotAvailable').text('LOADING').attr('data-value', 'NOT AVAILABLE');

  chrome.runtime.sendMessage(
    { contentScriptQuery: 'general', link: 'https://secondchancebusinesscoalition.org/about' },
    text => {
      return parseSCBCData(text, companyNames);
    });
}

function parseSCBCData(text, companyNames) {
  found = false;
  for (i = 0; i < companyNames.length; i++) {
    index = text.indexOf(`<img alt="${companyNames[i]}"`);
    if (index != -1) {
      found = true;
      break;
    }
  };

  $('#scbcNotAvailable').hide();
  if (found) {
    saveData({ scbcVerification: 'LISTED' });
    $('#scbcListed').show();
    $('#scbcNotListed').hide();
    $('#scbcNotAvailable').attr('data-value', 'LISTED');
  } else {
    saveData({ scbcVerification: 'NOT LISTED' });
    $('#scbcListed').hide();
    $('#scbcNotListed').show();
    $('#scbcNotAvailable').attr('data-value', 'NOT LISTED');
  }
}

function fetchPrisonData(companyNames) {
  $('#prisonNotAvailable').text('LOADING').attr('data-value', 'NOT AVAILABLE');

  chrome.runtime.sendMessage(
    { contentScriptQuery: 'general', link: 'https://investigate.afsc.org/prisons' },
    text => {
      return parsePrisonData(text, companyNames);
    });
}

function parsePrisonData(text, companyNames) {
  found = false;
  for (i = 0; i < companyNames.length; i++) {
    index = text.indexOf(`hreflang="en">${companyNames[i]}</a>`);
    if (index != -1) {
      found = true;
      break;
    }
  };

  $('#prisonNotAvailable').hide();
  if (found) {
    saveData({ prisonsVerification: 'LISTED' });
    $('#prisonNotListed').hide();
    $('#prisonListed').show();
    $('#prisonNotAvailable').attr('data-value', 'LISTED');
  } else {
    saveData({ prisonsVerification: 'NOT LISTED' });
    $('#prisonNotListed').show();
    $('#prisonListed').hide();
    $('#prisonNotAvailable').attr('data-value', 'NOT LISTED');
  }
}

function parseGlassdoorData(text) {
  type = getAttribute(text, 'data-test="employer-type"');
  type = cleanData(type).replace('Company - ', '')
  $('#companyTypeInput').val(type).trigger('keyup');

  size = getAttribute(text, 'data-test="employer-size"')
  size = cleanData(size).replace('Employees', '')
  $('#companySize').val(size).trigger('keyup');

  industry = getAttribute(text, 'data-test="employer-industry"', '</a>')
  industry = cleanData(industry).replace('&amp;', '&')
  $('#industryInput').val(industry).trigger('keyup');

  reviewsCount = getAttribute(text, "data-label='Reviews'>", '</span>', 25)
    .trim()
  $('#reviewCount').val(cleanData(reviewsCount)).trigger('keyup');
}

function parseGlassdoorReviewData(text) {
  averageReview = getAttribute(text, 'v2__EIReviewsRatingsStylesV2__ratingNum')
  $('#averageRating').val(cleanData(averageReview)).trigger('keyup');
}

function parseGlassdoorBenefitData(text) {
  benefitRating = getAttribute(text, 'css-b63kyi css-16iqw5x', '</strong>')
  $('#averageBenefitRating').val(cleanData(benefitRating)).trigger('keyup');
}

function getAttribute(text, attribute, endText = '</div>', startIndex = 0) {
  start = text.indexOf(attribute)
  start = text.indexOf('>', start + startIndex) + 1
  end = text.indexOf(endText, start)
  return text.substring(start, end)
}

function saveData(keyValue) {
  chrome.storage.sync.set(keyValue);
}

function restoreData() {
  chrome.storage.sync.get({
    companyName: '',
    metricName: '',
    status: 'Assigned',
    companyType: '',
    averageRating: '',
    averageBenefitRating: '',
    companySize: '',
    industry: '',
    reviewCount: '',
    glassdoorHomePage: '',
    companyHomePage: '',
    careerPage: '',
    aboutUsPage: '',
    csrPage: '',
    otherLinks: [],
    tempOtherLinksLabel: '',
    tempOtherLinksUrl: '',
    companyLinks0: '',
    companyLinks1: '',
    companyLinks2: '',
    companyLinks3: '',
    companyLinks4: '',
    companyLinks5: '',
    companyLinks6: '',
    companyLinks7: '',
    companyLinks8: '',
    companyLinks9: '',
    companyLinksIndicator0: '',
    companyLinksIndicator1: '',
    companyLinksIndicator2: '',
    companyLinksIndicator3: '',
    companyLinksIndicator4: '',
    companyLinksIndicator5: '',
    companyLinksIndicator6: '',
    companyLinksIndicator7: '',
    companyLinksIndicator8: '',
    companyLinksIndicator9: '',
    metricScoring: '0',
    comments: [],
    tempComment: '',
    searchDataParams: {
      metricName: '',
      metricId: '',
      companyName: '',
      companyId: '',
      companyMetricId: '',
      searched: false,
    },
    relaunchPadVerification: 'NOT AVAILABLE',
    scbcVerification: 'NOT AVAILABLE',
    prisonsVerification: 'NOT AVAILABLE',
  }, (items) => {
    setDocumentData(items);
    if (items.tempComment != '') {
      $('.toggle-comment').toggle();
      $('textarea.toggle-comment').val(items.tempComment);
    }
    if (items.tempOtherLinksLabel != '' || items.tempOtherLinksUrl != '') {
      $('#add-another-link-button').trigger('click');
      $('#add-another-link-form-url-label').val(items.tempOtherLinksLabel);
      $('#add-another-link-form-url').val(items.tempOtherLinksUrl);
    }
    $('#selectStatus').val(items.status);
    searchDataParams = items.searchDataParams;
  });
}