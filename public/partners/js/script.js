$(function() {

  $('.js-metro-city-select').select2();
  $('.js-business-name-select').select2({
    placeholder: "Enter your business name",
    ajax: {
      url: "/search",
      dataType: 'json',
      delay: 250,
      data: function (params) {

        var location = $('select[name=metro_city]').val();

        console.log('metro_city', location);

        return {
          term: params.term,
          location: location,
          page: params.page
        };
      },
      processResults: function (data, params) {
        params.page = params.page || 1;

        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    minimumInputLength: 1,
    templateResult: function (repo) {
      console.log('templateResult repo', repo);

      var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.name + "</div>";

      markup += "<div class='select2-result-repository__description'>" + repo.address + "</div>";

      markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-books'></i> " + repo.category + "</div>" +
        "</div>" +
        "</div></div>";
      return markup;
    },
    templateSelection: function (repo) {
      console.log('templateSelection repo', repo);
      return repo.name;
    }
  });
});