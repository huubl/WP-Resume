// Generated by CoffeeScript 1.10.0
(function() {
  var WP_Resume;

  WP_Resume = (function() {
    var init_project_controls, replace_project_index;

    function WP_Resume() {
      var j, len, ref, taxonomy;
      switch (pagenow) {
        case "wp_resume_position_page_wp_resume_options":
          jQuery("#wp_resume_help, #wp_resume_clearfix, #multiple, .underHood").hide();
          jQuery("#wp_resume_help_toggle").click(this.toggleHelp);
          jQuery("#toggleMultiple").click(this.toggleMultiple);
          jQuery("#toggleHood").click(this.toggleHood);
          jQuery("#user").change(jQuery(".button-primary").click);
          jQuery("#add_contact_field").click(this.addContactField);
          jQuery(".button-primary").click(this.submitOptions);
          this.addContactField();
          this.makeSortable();
          break;
        case "wp_resume_position":
          jQuery("#publish").click(this.validatePosition);
          ref = ["wp_resume_section", "wp_resume_organization", "wp_resume_skill"];
          for (j = 0, len = ref.length; j < len; j++) {
            taxonomy = ref[j];
            this.addTaxonomyBoxEvents(taxonomy);
          }
          jQuery("span.project-up").click(this.projectUp);
          jQuery("span.project-remove").click(this.projectRemove);
          jQuery("span.project-add").click(this.projectAdd);
          jQuery("span.project-down").click(this.projectDown);
          jQuery("li.project-form").each(function(idx, el) {
            return init_project_controls(jQuery(el));
          });
          break;
        case "edit-wp_resume_organization":
          jQuery("#parent, #tag-slug").parent().hide();
          jQuery("#tag-name").siblings("p").text(wp_resume.orgName);
          jQuery("#tag-description").attr("rows", "1").siblings("label").text("Location").siblings("p").text(wp_resume.orgLoc);
          break;
        case "edit-wp_resume_skill":
          jQuery("#tag-name").siblings("p").text(wp_resume.skillName);
          jQuery("#tag-description").attr("rows", "1").siblings("label").text("Skill Level").siblings("p").text(wp_resume.skillLevel);
          break;
        case "edit-wp_resume_section":
          jQuery("#parent").parent().hide();
          jQuery("#tag-description, #tag-slug").parent().hide();
      }
    }

    WP_Resume.prototype.toggleHelp = function() {
      jQuery("#wp_resume_help, #wp_resume_clearfix").toggle("fast");
      if (jQuery(this).text() === wp_resume.more) {
        jQuery(this).text(wp_resume.less);
      } else {
        jQuery(this).text(wp_resume.more);
      }
      return false;
    };

    WP_Resume.prototype.validatePosition = function(e) {
      if (jQuery("input:radio[name=wp_resume_section]:checked").val() !== "") {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      alert(wp_resume.missingTaxMsg);
      jQuery("#ajax-loading").hide();
      setTimeout("jQuery('#publish').removeClass('button-primary-disabled')", 1);
      return false;
    };

    WP_Resume.prototype.toggleMultiple = function() {
      jQuery("#multiple").toggle("fast");
      if (jQuery(this).text() === wp_resume.yes) {
        jQuery(this).text(wp_resume.no);
      } else {
        jQuery(this).text(wp_resume.yes);
      }
      return false;
    };

    WP_Resume.prototype.toggleHood = function() {
      jQuery('.underHood').toggle("fast");
      if (jQuery(this).text() === wp_resume.hideAdv) {
        jQuery(this).text(wp_resume.showAdv);
      } else {
        jQuery(this).text(wp_resume.hideAdv);
      }
      return false;
    };

    WP_Resume.prototype.addContactField = function() {
      jQuery("#contact_info").append(jQuery(".contact_info_blank").html());
      jQuery(".contact_info_row:last").fadeIn();
      return false;
    };

    WP_Resume.prototype.addTaxonomyBoxEvents = function(taxonomy) {
      jQuery("#add_" + taxonomy + "_toggle").live("click", function() {
        var type;
        type = jQuery(this).attr("id").replace("_toggle", "").replace("add_", "");
        return jQuery("#add_" + type + "_div").toggle();
      });
      return jQuery("#add_" + taxonomy + "_button").live("click", function(event) {
        var type;
        type = jQuery(this).attr("id").replace("_button", "").replace("add_", "");
        jQuery("#" + type + "-ajax-loading").show();
        jQuery.post("admin-ajax.php?action=add_" + type, jQuery("#new_" + type + ", #new_" + type + "_location, #new_" + type + "_level, #new_" + type + "_parent, #_ajax_nonce-add-" + type + ", #post_ID").serialize(), function(data) {
          return jQuery("#" + type + "div .inside").html(data);
        });
        return event.preventDefault();
      });
    };

    replace_project_index = function($project, newIndex) {
      $project.find('[for^="projects"]').each(function(idx, el) {
        var $el;
        $el = jQuery(el);
        return $el.attr('for', $el.attr('for').replace(/projects\[\d+\]/, 'projects[' + newIndex + ']'));
      });
      $project.find('[name^="projects"]').each(function(idx, el) {
        var $el;
        $el = jQuery(el);
        return $el.attr('name', $el.attr('name').replace(/projects\[\d+\]/, 'projects[' + newIndex + ']'));
      });
      return $project.find('[id^="project"]').each(function(idx, el) {
        var $el;
        $el = jQuery(el);
        return $el.attr('id', $el.attr('id').replace(/project\d+/, 'project' + newIndex));
      });
    };

    init_project_controls = function($project) {
      $project.find('span.project-up').attr('disabled', $project.index() === 0);
      return $project.find('span.project-down').attr('disabled', $project.next().length === 0);
    };

    WP_Resume.prototype.projectUp = function(e) {
      var $prev, $project, $target, index;
      $target = jQuery(e.target);
      $project = $target.closest('li.project-form');
      index = $project.index();
      $prev = $project.prev('li');
      if (index > 0) {
        replace_project_index($project, index - 1);
        replace_project_index($prev, index);
        $prev.insertAfter($project);
        init_project_controls($project);
        return init_project_controls($prev);
      }
    };

    WP_Resume.prototype.projectRemove = function(e) {
      var $parent, $project, $target, index;
      $target = jQuery(e.target);
      $project = $target.closest('li.project-form');
      index = $project.index();
      $parent = $project.parent();
      if ($parent.children('li').length > 1) {
        $project.remove();
        return $parent.children('li').each(function(idx, el) {
          if (idx >= index) {
            replace_project_index(jQuery(el), idx);
          }
          return init_project_controls(jQuery(el));
        });
      } else {
        $project.find('input').val('');
        return $project.find('textarea').val('');
      }
    };

    WP_Resume.prototype.projectAdd = function(e) {
      var $clone, $project, $target, index;
      $target = jQuery(e.target);
      $project = $target.closest('li.project-form');
      index = $project.index();
      $clone = $project.clone(true).insertAfter($project);
      $clone.find('input').val('');
      $clone.find('textarea').val('');
      $project.parent().children('li').each(function(idx, el) {
        if (idx > index) {
          replace_project_index(jQuery(el), idx);
        }
        return init_project_controls(jQuery(el));
      });
      return $clone.find('.project-name>input').focus();
    };

    WP_Resume.prototype.projectDown = function(e) {
      var $next, $project, $target, index;
      $target = jQuery(e.target);
      $project = $target.closest('li.project-form');
      index = $project.index();
      $next = $project.next('li');
      if (index < $project.parent().children('li').length - 1) {
        replace_project_index($project, index + 1);
        replace_project_index($next, index);
        $next.insertBefore($project);
        init_project_controls($project);
        return init_project_controls($next);
      }
    };

    WP_Resume.prototype.makeSortable = function() {
      jQuery("#sections, .positions, .organizations").sortable({
        axis: "y",
        containment: "parent",
        opacity: .5,
        update: function() {},
        placeholder: "placeholder",
        forcePlaceholderSize: "true"
      });
      return jQuery("#sections").disableSelection();
    };

    WP_Resume.prototype.submitOptions = function() {
      jQuery(".section").each(function(i, section) {
        return jQuery("#wp_resume_form").append("<input type=\"hidden\" name=\"wp_resume_options[order][" + jQuery(this).attr("id") + "]\" value=\"" + i + "\">");
      });
      return jQuery(".position").each(function(i, position) {
        return jQuery("#wp_resume_form").append("<input type=\"hidden\" name=\"wp_resume_options[position_order][" + jQuery(this).attr("id") + "]\" value=\"" + i + "\">");
      });
    };

    return WP_Resume;

  })();

  jQuery(document).ready(function() {
    return window.resume = new WP_Resume();
  });

}).call(this);
